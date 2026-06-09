import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { checkSearchQuota } from '../lib/api';

export default function HomeScreen({ navigation }) {
  const { user, profile } = useAuth();
  const [quota, setQuota] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const firstName = profile?.display_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  useEffect(() => {
    loadQuota();
  }, []);

  async function loadQuota() {
    try {
      const q = await checkSearchQuota();
      setQuota(q);
    } catch (err) {
      console.warn('Quota check failed:', err.message);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadQuota();
    setRefreshing(false);
  }

  const QUICK_ACTIONS = [
    { icon: 'alert-circle', color: COLORS.accent, label: 'Report\nScam', screen: 'ReportScam' },
    { icon: 'flash', color: COLORS.warning, label: 'Quick\nReport', screen: 'QuickReport' },
    { icon: 'search', color: COLORS.secondary, label: 'Scam\nLookup', screen: 'ScamLookup' },
    { icon: 'document-text', color: COLORS.success, label: 'My\nReports', screen: 'MyReports' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />}
    >
      {/* Welcome */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeTop}>
          <View>
            <Text style={styles.greeting}>Hi {firstName} 👋</Text>
            <Text style={styles.subtitle}>What would you like to do?</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={36} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.screen}
            style={styles.actionCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(action.screen)}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
              <Ionicons name={action.icon} size={28} color={action.color} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Quota */}
      <Card style={styles.quotaCard}>
        <View style={styles.quotaHeader}>
          <Text style={styles.quotaTitle}>Search Quota</Text>
          {quota?.unlimited && (
            <View style={styles.unlimitedBadge}>
              <Text style={styles.unlimitedText}>Unlimited</Text>
            </View>
          )}
        </View>
        {quota && !quota.unlimited ? (
          <>
            <View style={styles.quotaBar}>
              <View
                style={[
                  styles.quotaFill,
                  { width: `${((quota.limit - quota.remaining) / quota.limit) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.quotaInfo}>
              {quota.remaining} of {quota.limit} searches remaining this month
            </Text>
          </>
        ) : quota?.unlimited ? (
          <Text style={styles.quotaInfo}>
            ✅ Unlimited searches as a Social Catfish customer
          </Text>
        ) : (
          <Text style={styles.quotaInfo}>Loading...</Text>
        )}
        {!profile?.is_socialcatfish_customer && (
          <TouchableOpacity
            style={styles.upgradeLink}
            onPress={() => navigation.navigate('Profile', { showVerify: true })}
          >
            <Text style={styles.upgradeLinkText}>
              Social Catfish customer? Verify for unlimited searches →
            </Text>
          </TouchableOpacity>
        )}
      </Card>

      {/* Recent Activity Teaser */}
      <Card style={styles.recentCard}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>📊 Community Stats</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statLabel}>Reports Filed</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>🌐</Text>
            <Text style={styles.statLabel}>Scam Sites Flagged</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>🛡️</Text>
            <Text style={styles.statLabel}>People Protected</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => navigation.navigate('ScamLookup')}
        >
          <Text style={styles.viewAllText}>Search the Database →</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 100 },
  welcomeSection: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.lg,
    paddingTop: 60,
    paddingBottom: SIZES.xl,
    borderBottomLeftRadius: SIZES.radiusXl,
    borderBottomRightRadius: SIZES.radiusXl,
  },
  welcomeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.white },
  subtitle: { fontSize: SIZES.body, color: COLORS.textMuted, marginTop: 2 },
  profileBtn: { padding: 4 },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.md,
    marginTop: -SIZES.md,
    gap: SIZES.sm,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.sm,
  },
  actionLabel: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 18,
  },
  quotaCard: { marginHorizontal: SIZES.md, marginTop: SIZES.md },
  quotaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.sm },
  quotaTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary },
  unlimitedBadge: {
    backgroundColor: COLORS.success + '15',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: SIZES.radiusFull,
  },
  unlimitedText: { fontSize: SIZES.caption, fontWeight: '600', color: COLORS.success },
  quotaBar: {
    height: 8,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  quotaFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
  },
  quotaInfo: { fontSize: SIZES.caption, color: COLORS.textSecondary, marginTop: 6 },
  upgradeLink: { marginTop: SIZES.sm },
  upgradeLinkText: { fontSize: SIZES.caption, color: COLORS.accent, fontWeight: '500' },
  recentCard: { marginHorizontal: SIZES.md, marginTop: SIZES.md },
  recentHeader: { marginBottom: SIZES.sm },
  recentTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: SIZES.sm },
  stat: { alignItems: 'center' },
  statIcon: { fontSize: 28, marginBottom: 4 },
  statLabel: { fontSize: SIZES.caption, color: COLORS.textSecondary, textAlign: 'center' },
  viewAllBtn: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SIZES.sm,
    marginTop: SIZES.sm,
    alignItems: 'center',
  },
  viewAllText: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.accent },
});
