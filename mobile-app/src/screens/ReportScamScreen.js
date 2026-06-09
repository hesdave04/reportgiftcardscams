import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, SIZES } from '../constants/theme';
import { SCAM_TYPES } from '../constants/scamTypes';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { submitCaseIntake } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

const PLATFORMS = ['Facebook', 'Instagram', 'WhatsApp', 'Telegram', 'Tinder', 'Bumble', 'Email', 'Phone', 'Text/SMS', 'Website', 'X (Twitter)', 'LinkedIn', 'Snapchat', 'TikTok', 'Discord', 'Reddit', 'Other'];

export default function ReportScamScreen({ navigation }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: type, 2: details, 3: suspect, 4: review
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    scam_type: '',
    platforms: [],
    story: '',
    amount: '',
    suspect_name: '',
    suspect_email: '',
    suspect_phone: '',
    suspect_username: '',
    suspect_wallet: '',
    suspect_website: '',
    reporter_email: user?.email || '',
  });

  const updateForm = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const togglePlatform = (p) => {
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(p)
        ? f.platforms.filter((x) => x !== p)
        : [...f.platforms, p],
    }));
  };

  const selectedType = SCAM_TYPES.find((t) => t.key === form.scam_type);

  const canProceed = () => {
    if (step === 1) return !!form.scam_type;
    if (step === 2) return form.story.length >= 20;
    if (step === 3) return true; // suspect info is optional
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitCaseIntake({
        scam_type: selectedType?.label || form.scam_type,
        platforms: form.platforms.join(', '),
        story: form.story,
        amount: form.amount ? parseFloat(form.amount) : null,
        suspect_name: form.suspect_name || null,
        suspect_email: form.suspect_email || null,
        suspect_phone: form.suspect_phone || null,
        suspect_username: form.suspect_username || null,
        suspect_wallet: form.suspect_wallet || null,
        suspect_website: form.suspect_website || null,
        reporter_email: form.reporter_email || null,
        reporter_user_id: user?.id,
        source: 'mobile_app',
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        'Report Submitted ✅',
        'Thank you. Your report is now part of our database and helps protect others.',
        [{ text: 'Done', onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Progress */}
        <View style={styles.progress}>
          {[1, 2, 3, 4].map((s) => (
            <View key={s} style={[styles.progressDot, s <= step && styles.progressActive]} />
          ))}
        </View>
        <Text style={styles.stepLabel}>
          Step {step} of 4 — {['Scam Type', 'Details', 'Suspect Info', 'Review'][step - 1]}
        </Text>

        {/* Step 1: Scam Type */}
        {step === 1 && (
          <View style={styles.typeGrid}>
            {SCAM_TYPES.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[styles.typeCard, form.scam_type === type.key && styles.typeSelected]}
                onPress={() => { updateForm('scam_type', type.key); Haptics.selectionAsync(); }}
                activeOpacity={0.7}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={[styles.typeLabel, form.scam_type === type.key && styles.typeLabelSelected]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <>
            <Text style={styles.sectionTitle}>Where did the scam happen?</Text>
            <View style={styles.platformGrid}>
              {PLATFORMS.map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.platformChip, form.platforms.includes(p) && styles.platformSelected]}
                  onPress={() => togglePlatform(p)}
                >
                  <Text style={[styles.platformText, form.platforms.includes(p) && styles.platformTextSelected]}>
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Input
              label="What happened?"
              placeholder="Describe the scam in detail — what they said, how they contacted you, what you were asked to do..."
              value={form.story}
              onChangeText={(v) => updateForm('story', v)}
              multiline
              numberOfLines={6}
              maxLength={5000}
            />
            <Input
              label="Amount lost (optional)"
              placeholder="0.00"
              value={form.amount}
              onChangeText={(v) => updateForm('amount', v)}
              keyboardType="decimal-pad"
              icon="cash-outline"
            />
          </>
        )}

        {/* Step 3: Suspect Info */}
        {step === 3 && (
          <>
            <Text style={styles.sectionTitle}>Suspect details (optional)</Text>
            <Text style={styles.sectionHint}>Any info you provide helps identify the scammer. All fields are optional.</Text>
            <Input label="Name used" placeholder="Name the scammer used" value={form.suspect_name} onChangeText={(v) => updateForm('suspect_name', v)} icon="person-outline" />
            <Input label="Email" placeholder="scammer@email.com" value={form.suspect_email} onChangeText={(v) => updateForm('suspect_email', v)} keyboardType="email-address" icon="mail-outline" />
            <Input label="Phone number" placeholder="+1 (555) 123-4567" value={form.suspect_phone} onChangeText={(v) => updateForm('suspect_phone', v)} keyboardType="phone-pad" icon="call-outline" />
            <Input label="Username / profile" placeholder="@username or profile URL" value={form.suspect_username} onChangeText={(v) => updateForm('suspect_username', v)} icon="at-outline" />
            <Input label="Crypto wallet address" placeholder="0x… or bc1…" value={form.suspect_wallet} onChangeText={(v) => updateForm('suspect_wallet', v)} icon="wallet-outline" />
            <Input label="Website" placeholder="https://suspicious-site.com" value={form.suspect_website} onChangeText={(v) => updateForm('suspect_website', v)} keyboardType="url" icon="globe-outline" />
          </>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <Card>
            <Text style={styles.reviewTitle}>Review your report</Text>
            <ReviewRow label="Scam Type" value={selectedType?.label} icon={selectedType?.icon} />
            {form.platforms.length > 0 && <ReviewRow label="Platform(s)" value={form.platforms.join(', ')} />}
            <ReviewRow label="Description" value={form.story.length > 120 ? form.story.slice(0, 120) + '…' : form.story} />
            {form.amount && <ReviewRow label="Amount Lost" value={`$${parseFloat(form.amount).toLocaleString()}`} />}
            {form.suspect_name && <ReviewRow label="Suspect Name" value={form.suspect_name} />}
            {form.suspect_email && <ReviewRow label="Suspect Email" value={form.suspect_email} />}
            {form.suspect_phone && <ReviewRow label="Suspect Phone" value={form.suspect_phone} />}
            {form.suspect_username && <ReviewRow label="Suspect Username" value={form.suspect_username} />}
            {form.suspect_wallet && <ReviewRow label="Crypto Wallet" value={form.suspect_wallet} />}
            {form.suspect_website && <ReviewRow label="Website" value={form.suspect_website} />}
          </Card>
        )}

        {/* Navigation */}
        <View style={styles.navRow}>
          {step > 1 && (
            <Button title="Back" variant="outline" onPress={() => setStep(step - 1)} style={{ flex: 1 }} />
          )}
          {step < 4 ? (
            <Button title="Next" onPress={() => setStep(step + 1)} disabled={!canProceed()} style={{ flex: 1 }} />
          ) : (
            <Button title="Submit Report" onPress={handleSubmit} loading={loading} style={{ flex: 1 }} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ReviewRow({ label, value, icon }) {
  if (!value) return null;
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>
        {icon ? `${icon} ` : ''}{value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.lg, paddingBottom: 100 },
  progress: { flexDirection: 'row', gap: 6, marginBottom: 6 },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: COLORS.border },
  progressActive: { backgroundColor: COLORS.accent },
  stepLabel: { fontSize: SIZES.caption, color: COLORS.textMuted, marginBottom: SIZES.lg },
  sectionTitle: { fontSize: SIZES.subtitle, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SIZES.sm },
  sectionHint: { fontSize: SIZES.body, color: COLORS.textSecondary, marginBottom: SIZES.md },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeCard: {
    width: '31%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.sm,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  typeSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accent + '08' },
  typeIcon: { fontSize: 28, marginBottom: 4 },
  typeLabel: { fontSize: 11, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 14 },
  typeLabelSelected: { color: COLORS.accent, fontWeight: '600' },
  platformGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: SIZES.lg },
  platformChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  platformSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accent + '10' },
  platformText: { fontSize: SIZES.body, color: COLORS.textSecondary },
  platformTextSelected: { color: COLORS.accent, fontWeight: '600' },
  navRow: { flexDirection: 'row', gap: SIZES.sm, marginTop: SIZES.xl },
  reviewTitle: { fontSize: SIZES.subtitle, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SIZES.md },
  reviewRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  reviewLabel: { fontSize: SIZES.caption, color: COLORS.textMuted, marginBottom: 2 },
  reviewValue: { fontSize: SIZES.body, color: COLORS.textPrimary },
});
