import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import rateLimit from "@/utils/rate-limit";
import { randomUUID } from "crypto";

const limiter = rateLimit({ window: 60, limit: 30 });

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 10;
const BUCKET = "evidence";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "0.0.0.0";

    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const client = getSupabaseAdmin();
    if (!client) {
      return Response.json(
        { success: false, error: "Storage is not configured." },
        { status: 501 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return Response.json(
        { success: false, error: "No files provided." },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return Response.json(
        {
          success: false,
          error: `Maximum ${MAX_FILES} files allowed per upload.`,
        },
        { status: 400 }
      );
    }

    const caseId = formData.get("caseId") || randomUUID();
    const uploaded = [];
    const errors = [];

    for (const file of files) {
      // Validate type
      if (!ALLOWED_TYPES.has(file.type)) {
        errors.push({ name: file.name, error: "File type not allowed." });
        continue;
      }

      // Validate size
      if (file.size > MAX_FILE_SIZE) {
        errors.push({ name: file.name, error: "File too large (max 10MB)." });
        continue;
      }

      const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
      const storagePath = `${caseId}/${randomUUID()}.${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await client.storage
        .from(BUCKET)
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        errors.push({
          name: file.name,
          error: uploadError.message || "Upload failed.",
        });
        continue;
      }

      // Get a signed URL (valid for 1 year)
      const { data: signedData, error: signError } = await client.storage
        .from(BUCKET)
        .createSignedUrl(storagePath, 60 * 60 * 24 * 365);

      if (signError) {
        console.error("Signed URL error:", signError);
        // Fall back to public URL structure
        const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
        uploaded.push({
          name: file.name,
          path: storagePath,
          url: publicUrl,
          type: file.type,
          size: file.size,
        });
      } else {
        uploaded.push({
          name: file.name,
          path: storagePath,
          url: signedData.signedUrl,
          type: file.type,
          size: file.size,
        });
      }
    }

    return Response.json({
      success: true,
      caseId,
      uploaded,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return Response.json(
      { success: false, error: "Failed to process upload." },
      { status: 500 }
    );
  }
}
