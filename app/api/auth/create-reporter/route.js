// app/api/auth/create-reporter/route.js
// Called after signup to create the reporters row via service role.
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, email, displayName } = body;

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 });
    }

    const supa = getSupabaseAdmin();
    if (!supa) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    // Check if reporter already exists
    const { data: existing } = await supa
      .from('reporters')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existing) {
      return NextResponse.json({ ok: true, reporter: existing });
    }

    // Create reporter profile
    const { data, error } = await supa
      .from('reporters')
      .insert({
        user_id: userId,
        email,
        display_name: displayName || email.split('@')[0],
        role: 'reporter',
        is_whitelisted: false,
        reports_count: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Create reporter error:', error);
      return NextResponse.json({ error: 'Failed to create reporter profile' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, reporter: data });
  } catch (e) {
    console.error('create-reporter error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
