import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.updated}>Last updated: January 15, 2025</Text>

      <Text style={styles.body}>
        These Terms of Service ("Terms") govern your use of the ScamComplaints mobile application ("App") operated by ScamComplaints ("we," "us," or "our"). By using the App, you agree to these Terms.
      </Text>

      <Text style={styles.heading}>1. Eligibility</Text>
      <Text style={styles.body}>
        You must be at least 13 years old to use this App. By creating an account, you represent that you meet this age requirement. Users under 18 should use the App with parental or guardian consent.
      </Text>

      <Text style={styles.heading}>2. Account Registration</Text>
      <Text style={styles.body}>
        You must create an account to use the App's features. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate information and to update it as necessary.
      </Text>

      <Text style={styles.heading}>3. Scam Reporting</Text>
      <Text style={styles.body}>
        When you submit a scam report, you represent that the information is truthful and submitted in good faith. Deliberately submitting false reports, using the platform to harass individuals, or filing reports as a form of retaliation is prohibited and may result in account termination.{'\n\n'}
        Reports become part of our public scam database. While your personal identity is protected, the scam details you report (suspect names, emails, phone numbers, websites, descriptions) may be publicly searchable.
      </Text>

      <Text style={styles.heading}>4. Scam Lookup Service</Text>
      <Text style={styles.body}>
        Free accounts receive 10 scam lookups per calendar month. Verified Social Catfish customers receive unlimited lookups. Search limits reset on the 1st of each month.{'\n\n'}
        Search results are provided for informational purposes only. A match in our database does not constitute proof of fraud, and the absence of results does not guarantee safety. You should not rely solely on our database when making decisions.
      </Text>

      <Text style={styles.heading}>5. Social Catfish Customer Verification</Text>
      <Text style={styles.body}>
        Users claiming to be Social Catfish customers must verify their status through the App. We reserve the right to revoke unlimited search privileges if verification is found to be fraudulent.
      </Text>

      <Text style={styles.heading}>6. Prohibited Conduct</Text>
      <Text style={styles.body}>
        You agree not to:{'\n'}
        • Submit false, misleading, or malicious reports{'\n'}
        • Use the App to harass, defame, or stalk individuals{'\n'}
        • Attempt to circumvent search limits or security measures{'\n'}
        • Scrape, harvest, or bulk-download data from the App{'\n'}
        • Use automated tools (bots) to interact with the App{'\n'}
        • Reverse-engineer the App or its underlying systems{'\n'}
        • Use the App for any unlawful purpose
      </Text>

      <Text style={styles.heading}>7. Intellectual Property</Text>
      <Text style={styles.body}>
        The App, its design, features, and content (excluding user-submitted reports) are owned by ScamComplaints and protected by copyright and other intellectual property laws. You may not copy, modify, or distribute any part of the App without our written consent.
      </Text>

      <Text style={styles.heading}>8. Disclaimers</Text>
      <Text style={styles.body}>
        THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY SCAM REPORTS OR SEARCH RESULTS. WE ARE NOT A LAW ENFORCEMENT AGENCY AND DO NOT INVESTIGATE SCAMS.{'\n\n'}
        We are not responsible for any decisions you make based on information obtained through the App.
      </Text>

      <Text style={styles.heading}>9. Limitation of Liability</Text>
      <Text style={styles.body}>
        TO THE FULLEST EXTENT PERMITTED BY LAW, SCAMCOMPLAINTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP.
      </Text>

      <Text style={styles.heading}>10. Account Termination</Text>
      <Text style={styles.body}>
        We reserve the right to suspend or terminate your account at any time for violations of these Terms. You may delete your account at any time through the App's settings. Upon deletion, your personal data will be removed and your reports anonymized.
      </Text>

      <Text style={styles.heading}>11. Changes to Terms</Text>
      <Text style={styles.body}>
        We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance. We will notify you of material changes through the App.
      </Text>

      <Text style={styles.heading}>12. Governing Law</Text>
      <Text style={styles.body}>
        These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.
      </Text>

      <Text style={styles.heading}>13. Contact</Text>
      <Text style={styles.body}>
        Questions? Contact us at:{'\n'}
        Email: legal@scamcomplaints.org{'\n'}
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
});
