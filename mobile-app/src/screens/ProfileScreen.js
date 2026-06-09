import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Linking, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { verifySocialCatfishCustomer, checkSearchQuota, deleteAccount } from '../lib/api';

export default function ProfileScreen({ navigation, route }) {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [showVerify, setShowVerify] = useState(route.params?.showVerify || false);
  const [scfEmail, setScfEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [quota, setQuota] = useState(null);

  useEffect(() => {
    checkSearchQuota().then(setQuota).catch(() => {});
  }, []);

  const handleVerifySCF = async () => {
    if (!scfEmail.trim() || !/\S+@\S+\.\S+/.test(scfEmail)) {
      Alert.alert('Invalid email', 'Please enter the email you use for your Social Catfish account.');
      return;
    }
    setVerifying(true);
    try {
      await verifySocialCatfishCustomer(scfEmail.trim());
      await refreshProfile();
      Alert.alert('Verified! ✅', 'You now have unlimited scam lookups.');
      setShowVerify(false);
    } catch (err) {
      Alert.alert('Verification failed', err.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and anonymize your reports. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete My Account',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
              Alert.alert('Account deleted', 'Your account has been removed.');
            } catch (err) {
              Alert.alert('Error', err.message);
            }
          },
        },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        {
          icon: 'person-outline',
          label: profile?.display_name || user?.email,
          sub: user?.email,
          onPress: null,
        },
        profile?.is_socialcatfish_customer
          ? { icon: 'checkmark-circle', label: 'Social Catfish Verified', sub: 'Unlimited searches', color: COLORS.success }
          : { icon: 'shield-checkmark-outline', label: 'Verify Social Catfish Account', sub: 'Get unlimited searches', onPress: () => setShowVerify(!showVerify) },
      ],
    },
    {
      title: 'Search Quota',
      items: [
        {
          icon: 'search',
          label: quota?.unlimited ? 'Unlimited Searches' : `${quota?.remaining ?? '…'} / ${quota?.limit ?? '…'} remaining`,
          sub: quota?.unlimited ? 'Social Catfish customer benefit' : `Resets ${quota?.resetDate ? new Date(quota.resetDate).toLocaleDateString() : 'monthly'}`,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { icon: 'notifications-outline', label: 'Push Notifications', sub: 'Manage alerts', onPress: () => navigation.navigate('NotificationSettings') },
      ],
    },
    {
      title: 'Legal',
      items: [
        { icon: 'document-text-outline', label: 'Privacy Policy', onPress: () => navigation.navigate('PrivacyPolicy') },
        { icon: 'newspaper-outline', label: 'Terms of Service', onPress: () => navigation.navigate('TermsOfService') },
        { icon: 'information-circle-outline', label: 'About', onPress: () => navigation.navigate('About') },
        { icon: 'help-circle-outline', label: 'Contact Support', onPress: () => Linking.openURL('mailto:support@scamcomplaints.org') },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        { icon: 'log-out-outline', label: 'Sign Out', color: COLORS.textSecondary, onPress: handleSignOut },
        { icon: 'trash-outline', label: 'Delete Account', color: COLORS.danger, onPress: handleDeleteAccount },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(profile?.display_name || user?.email || '?')[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{profile?.display_name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* SCF Verification */}
      {showVerify && !profile?.is_socialcatfish_customer && (
        <Card style={styles.verifyCard}>
          <Text style={styles.verifyTitle}>🔓 Unlock Unlimited Searches</Text>
          <Text style={styles.verifyDesc}>
            Enter the email address associated with your SocialCatfish.com account to verify.
          </Text>
          <Input
            placeholder="your-email@example.com"
            value={scfEmail}
            onChangeText={setScfEmail}
            keyboardType="email-address"
            icon="mail-outline"
          />
          <Button title="Verify My Account" onPress={handleVerifySCF} loading={verifying} />
        </Card>
      )}

      {/* Menu sections */}
      {menuSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Card padding={0}>
            {section.items.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.menuItem, i < section.items.length - 1 && styles.menuBorder]}
                onPress={item.onPress}
                disabled={!item.onPress}
                activeOpacity={item.onPress ? 0.6 : 1}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={item.color || COLORS.textSecondary}
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.menuLabel, item.color && { color: item.color }]}>
                    {item.label}
                  </Text>
                  {item.sub && <Text style={styles.menuSub}>{item.sub}</Text>}
                </View>
                {item.onPress && (
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                )}
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      ))}

      <Text style={styles.version}>ScamComplaints v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 100 },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: SIZES.lg,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SIZES.radiusXl,
    borderBottomRightRadius: SIZES.radiusXl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.sm,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: COLORS.white },
  name: { fontSize: SIZES.title, fontWeight: '700', color: COLORS.white },
  email: { fontSize: SIZES.body, color: COLORS.textMuted, marginTop: 2 },
  verifyCard: { marginHorizontal: SIZES.md, marginTop: SIZES.md },
  verifyTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  verifyDesc: { fontSize: SIZES.body, color: COLORS.textSecondary, marginBottom: SIZES.md, lineHeight: 22 },
  section: { marginTop: SIZES.lg, paddingHorizontal: SIZES.md },
  sectionTitle: { fontSize: SIZES.caption, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6, marginLeft: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.md, paddingVertical: 14 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  menuLabel: { fontSize: SIZES.bodyLg, color: COLORS.textPrimary },
  menuSub: { fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: 1 },
  version: { textAlign: 'center', fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: SIZES.xl },
});
