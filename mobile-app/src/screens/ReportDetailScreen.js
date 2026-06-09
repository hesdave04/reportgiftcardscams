import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Card from '../components/Card';

export default function ReportDetailScreen({ route }) {
  const { report } = route.params;

  const fields = [
    { label: 'Scam Type', value: report.scam_type },
    { label: 'Platform(s)', value: report.platforms },
    { label: 'Amount Lost', value: report.amount ? `$${Number(report.amount).toLocaleString()}` : null },
    { label: 'Suspect Name', value: report.suspect_name },
    { label: 'Suspect Email', value: report.suspect_email },
    { label: 'Suspect Phone', value: report.suspect_phone },
    { label: 'Suspect Username', value: report.suspect_username },
    { label: 'Crypto Wallet', value: report.suspect_wallet },
    { label: 'Suspect Website', value: report.suspect_website },
    { label: 'Reported', value: report.created_at ? new Date(report.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.type}>{report.scam_type || report.title || 'Scam Report'}</Text>
        {report.amount && (
          <View style={styles.amountBadge}>
            <Text style={styles.amountText}>${Number(report.amount).toLocaleString()} lost</Text>
          </View>
        )}
      </View>

      {/* Story */}
      {(report.story || report.summary) && (
        <Card style={{ marginBottom: SIZES.md }}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.story}>{report.story || report.summary}</Text>
        </Card>
      )}

      {/* Details */}
      <Card>
        <Text style={styles.sectionTitle}>Report Details</Text>
        {fields.map((f, i) =>
          f.value ? (
            <View key={i} style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>{f.label}</Text>
              <Text style={styles.fieldValue} selectable>{f.value}</Text>
            </View>
          ) : null
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.lg, paddingBottom: 100 },
  header: { marginBottom: SIZES.lg },
  type: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.textPrimary },
  amountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.danger + '15',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
    marginTop: SIZES.sm,
  },
  amountText: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.danger },
  sectionTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SIZES.sm },
  story: { fontSize: SIZES.bodyLg, color: COLORS.textSecondary, lineHeight: 26 },
  fieldRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  fieldLabel: { fontSize: SIZES.caption, color: COLORS.textMuted, marginBottom: 2 },
  fieldValue: { fontSize: SIZES.body, color: COLORS.textPrimary },
});
