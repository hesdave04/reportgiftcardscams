import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.updated}>Last updated: January 15, 2025</Text>

      <Text style={styles.body}>
        ScamComplaints ("we," "us," or "our") operates the ScamComplaints mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
      </Text>

      <Text style={styles.heading}>1. Information We Collect</Text>
      <Text style={styles.body}>
        <Text style={styles.bold}>Account Information:</Text> When you create an account, we collect your email address, display name, and authentication credentials. If you sign in with Apple or Google, we receive the information you authorize those services to share.{'\n\n'}
        <Text style={styles.bold}>Scam Reports:</Text> When you submit a scam report, we collect the information you provide, including scam type, description, platform, and any suspect details (names, emails, phone numbers, websites, crypto wallets). This information is stored in our database and may be made publicly searchable to help protect others.{'\n\n'}
        <Text style={styles.bold}>Search Activity:</Text> We track the number of searches you perform each month to enforce usage limits. We do not log your individual search queries.{'\n\n'}
        <Text style={styles.bold}>Device Information:</Text> We collect device type, operating system, and app version for analytics and troubleshooting. We do not collect precise location data.{'\n\n'}
        <Text style={styles.bold}>Push Notification Tokens:</Text> If you enable push notifications, we store your device token to send you alerts.
      </Text>

      <Text style={styles.heading}>2. How We Use Your Information</Text>
      <Text style={styles.body}>
        • To provide and maintain the App{'\n'}
        • To process and display scam reports{'\n'}
        • To enable scam database searches{'\n'}
        • To manage your account and enforce search limits{'\n'}
        • To send push notifications (with your consent){'\n'}
        • To verify Social Catfish customer status{'\n'}
        • To improve the App and user experience{'\n'}
        • To prevent fraud and abuse of our services
      </Text>

      <Text style={styles.heading}>3. How We Share Your Information</Text>
      <Text style={styles.body}>
        <Text style={styles.bold}>Public Scam Reports:</Text> Scam reports are made publicly available in our database to warn others. Your personal identity (email, account) is never displayed publicly — only the scam details you report.{'\n\n'}
        <Text style={styles.bold}>Law Enforcement:</Text> We may share report data with law enforcement agencies investigating fraud.{'\n\n'}
        <Text style={styles.bold}>Service Providers:</Text> We use Supabase for data storage and authentication, and Vercel for hosting. These providers process data on our behalf under strict contractual obligations.{'\n\n'}
        We do not sell your personal information to third parties.
      </Text>

      <Text style={styles.heading}>4. Data Retention</Text>
      <Text style={styles.body}>
        Account data is retained while your account is active. If you delete your account, we remove your personal information and anonymize your submitted reports (the report content remains to protect others, but your identity is disassociated). Scam reports are retained indefinitely as part of our public fraud database.
      </Text>

      <Text style={styles.heading}>5. Your Rights</Text>
      <Text style={styles.body}>
        You have the right to:{'\n'}
        • Access your personal data{'\n'}
        • Correct inaccurate data{'\n'}
        • Delete your account and personal data{'\n'}
        • Export your data{'\n'}
        • Opt out of push notifications{'\n\n'}
        To exercise these rights, use the in-app settings or contact us at privacy@scamcomplaints.org.
      </Text>

      <Text style={styles.heading}>6. Children's Privacy</Text>
      <Text style={styles.body}>
        The App is not intended for users under 13 years of age. We do not knowingly collect information from children under 13. If we become aware that we have collected data from a child under 13, we will delete it immediately.
      </Text>

      <Text style={styles.heading}>7. Security</Text>
      <Text style={styles.body}>
        We implement industry-standard security measures including encryption in transit (TLS), encrypted storage, and secure authentication. However, no method of electronic transmission or storage is 100% secure.
      </Text>

      <Text style={styles.heading}>8. Changes to This Policy</Text>
      <Text style={styles.body}>
        We may update this Privacy Policy from time to time. We will notify you of significant changes through the App or by email. Continued use of the App after changes constitutes acceptance of the updated policy.
      </Text>

      <Text style={styles.heading}>9. Contact Us</Text>
      <Text style={styles.body}>
        Questions about this Privacy Policy? Contact us at:{'\n'}
        Email: privacy@scamcomplaints.org{'\n'}
        Website: https://scamcomplaints.org
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.lg, paddingBottom: 60 },
  title: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 4 },
  updated: { fontSize: SIZES.caption, color: COLORS.textMuted, marginBottom: SIZES.lg },
  heading: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary, marginTop: SIZES.lg, marginBottom: SIZES.sm },
  body: { fontSize: SIZES.body, color: COLORS.textSecondary, lineHeight: 24 },
  bold: { fontWeight: '600', color: COLORS.textPrimary },
});
