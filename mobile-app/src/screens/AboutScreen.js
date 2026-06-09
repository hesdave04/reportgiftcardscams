import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import Card from '../components/Card';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>🚨</Text>
        <Text style={styles.appName}>ScamComplaints</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.about}>
          ScamComplaints is a free, community-powered platform for reporting and looking up online scams. Our mission is to make the internet safer by creating a searchable public record of fraud — so the next person who encounters a scam can look it up before it's too late.
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.step}>
          <Text style={styles.stepIcon}>📝</Text>
          <View style={styles.stepText}>
            <Text style={styles.stepTitle}>Report</Text>
            <Text style={styles.stepDesc}>File a scam report in under 2 minutes. Provide as much detail as possible — every bit helps.</Text>
          </View>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepIcon}>🔍</Text>
          <View style={styles.stepText}>
            <Text style={styles.stepTitle}>Search</Text>
            <Text style={styles.stepDesc}>Look up emails, phone numbers, names, and websites to check if they've been reported before.</Text>
          </View>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepIcon}>🛡️</Text>
          <View style={styles.stepText}>
            <Text style={styles.stepTitle}>Protect</Text>
            <Text style={styles.stepDesc}>Your reports warn others and contribute to a growing database used to fight fraud.</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Contact & Support</Text>
        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('mailto:support@scamcomplaints.org')}>
          <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>support@scamcomplaints.org</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('https://scamcomplaints.org')}>
          <Ionicons name="globe-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>scamcomplaints.org</Text>
        </TouchableOpacity>
      </Card>

      <Text style={styles.footer}>
        A product of Social Catfish, Inc.{'\n'}
        © {new Date().getFullYear()} ScamComplaints. All rights reserved.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.lg, paddingBottom: 60 },
  header: { alignItems: 'center', marginBottom: SIZES.lg, paddingTop: SIZES.md },
  logo: { fontSize: 56 },
  appName: { fontSize: SIZES.heading, fontWeight: '800', color: COLORS.textPrimary, marginTop: SIZES.sm },
  version: { fontSize: SIZES.body, color: COLORS.textMuted, marginTop: 2 },
  card: { marginBottom: SIZES.md },
  about: { fontSize: SIZES.bodyLg, color: COLORS.textSecondary, lineHeight: 26 },
  sectionTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SIZES.md },
  step: { flexDirection: 'row', gap: SIZES.sm, marginBottom: SIZES.md },
  stepIcon: { fontSize: 24, marginTop: 2 },
  stepText: { flex: 1 },
  stepTitle: { fontSize: SIZES.bodyLg, fontWeight: '600', color: COLORS.textPrimary },
  stepDesc: { fontSize: SIZES.body, color: COLORS.textSecondary, lineHeight: 22, marginTop: 2 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: SIZES.sm, paddingVertical: 8 },
  contactText: { fontSize: SIZES.body, color: COLORS.secondary },
  footer: { textAlign: 'center', fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: SIZES.lg, lineHeight: 20 },
});
