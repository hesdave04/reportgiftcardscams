import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, SIZES } from '../constants/theme';
import { QUICK_REPORT_TYPES } from '../constants/scamTypes';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { submitQuickReport } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function QuickReportScreen({ navigation }) {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState(null);
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType || !value.trim()) {
      Alert.alert('Missing info', 'Please select a report type and enter the scam data.');
      return;
    }
    setLoading(true);
    try {
      await submitQuickReport({
        reportType: selectedType.key,
        data: value.trim(),
        notes: notes.trim() || null,
        reporter_user_id: user?.id,
        reporter_email: user?.email,
        source: 'mobile_app_quick',
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        'Reported ✅',
        'Your quick report has been submitted. Thank you for helping keep others safe.',
        [{ text: 'Done', onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Quick Report</Text>
      <Text style={styles.subtitle}>
        Quickly flag a scam phone number, email, website, crypto wallet, or social media profile.
      </Text>

      {/* Type selection */}
      <View style={styles.types}>
        {QUICK_REPORT_TYPES.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={[styles.typeCard, selectedType?.key === type.key && styles.typeSelected]}
            onPress={() => { setSelectedType(type); Haptics.selectionAsync(); }}
            activeOpacity={0.7}
          >
            <Text style={styles.typeIcon}>{type.icon}</Text>
            <Text style={[styles.typeLabel, selectedType?.key === type.key && styles.typeLabelActive]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input */}
      {selectedType && (
        <Card style={{ marginTop: SIZES.md }}>
          <Input
            label={selectedType.label}
            placeholder={selectedType.placeholder}
            value={value}
            onChangeText={setValue}
            keyboardType={selectedType.key === 'phone_report' ? 'phone-pad' : selectedType.key === 'email_report' ? 'email-address' : 'default'}
          />
          <Input
            label="Additional notes (optional)"
            placeholder="e.g. 'Pretended to be from the IRS' or 'Selling fake iPhones'"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            maxLength={1000}
          />
          <Button
            title="Submit Quick Report"
            onPress={handleSubmit}
            loading={loading}
            disabled={!value.trim()}
          />
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.lg, paddingBottom: 100 },
  heading: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: SIZES.body, color: COLORS.textSecondary, marginTop: 4, lineHeight: 22, marginBottom: SIZES.lg },
  types: { gap: SIZES.sm },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.border,
    gap: SIZES.sm,
  },
  typeSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accent + '08' },
  typeIcon: { fontSize: 24 },
  typeLabel: { fontSize: SIZES.bodyLg, fontWeight: '500', color: COLORS.textPrimary },
  typeLabelActive: { color: COLORS.accent, fontWeight: '600' },
});
