import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { searchScams, checkSearchQuota, consumeSearch } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

const SEARCH_TYPES = [
  { key: 'all', label: 'All', icon: 'search' },
  { key: 'email', label: 'Email', icon: 'mail' },
  { key: 'phone', label: 'Phone', icon: 'call' },
  { key: 'name', label: 'Name', icon: 'person' },
  { key: 'website', label: 'Website', icon: 'globe' },
  { key: 'crypto', label: 'Crypto', icon: 'wallet' },
];

export default function ScamLookupScreen({ navigation }) {
  const { profile } = useAuth();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [quota, setQuota] = useState(null);

  const doSearch = useCallback(async (pageNum = 1) => {
    if (!query.trim()) return;

    // Check quota first
    const q = await checkSearchQuota();
    setQuota(q);
    if (!q.unlimited && q.remaining <= 0) {
      Alert.alert(
        'Search Limit Reached',
        `You've used all ${q.limit} searches this month. Searches reset on ${new Date(q.resetDate).toLocaleDateString()}.` +
        '\n\nSocial Catfish customers get unlimited searches.',
        [
          { text: 'OK' },
          { text: 'Verify Account', onPress: () => navigation.navigate('Profile', { showVerify: true }) },
        ]
      );
      return;
    }

    setLoading(true);
    try {
      // Consume a search credit
      await consumeSearch();

      const data = await searchScams(query.trim(), pageNum);
      setResults(data);
      setPage(pageNum);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Refresh quota display
      const updatedQ = await checkSearchQuota();
      setQuota(updatedQ);
    } catch (err) {
      Alert.alert('Search Error', err.message);
    } finally {
      setLoading(false);
    }
  }, [query, navigation]);

  const getResultIcon = (type) => {
    switch (type) {
      case 'gift_card': return '🎁';
      case 'case_intake': return '📋';
      default: return '📄';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Scam Lookup</Text>
      <Text style={styles.subtitle}>
        Search our database of reported scams by email, phone, name, website, or crypto wallet.
      </Text>

      {/* Quota badge */}
      {quota && (
        <View style={styles.quotaBadge}>
          <Ionicons name="search" size={14} color={COLORS.textMuted} />
          <Text style={styles.quotaText}>
            {quota.unlimited
              ? '✅ Unlimited searches'
              : `${quota.remaining}/${quota.limit} searches remaining`}
          </Text>
        </View>
      )}

      {/* Search type tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={styles.tabsContent}>
        {SEARCH_TYPES.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, searchType === t.key && styles.tabActive]}
            onPress={() => setSearchType(t.key)}
          >
            <Ionicons
              name={t.icon}
              size={16}
              color={searchType === t.key ? COLORS.white : COLORS.textMuted}
            />
            <Text style={[styles.tabText, searchType === t.key && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search input */}
      <Input
        placeholder={
          searchType === 'email' ? 'Enter email address…' :
          searchType === 'phone' ? 'Enter phone number…' :
          searchType === 'name' ? 'Enter name…' :
          searchType === 'website' ? 'Enter website URL…' :
          searchType === 'crypto' ? 'Enter wallet address…' :
          'Search by email, phone, name, website…'
        }
        value={query}
        onChangeText={setQuery}
        icon="search-outline"
        keyboardType={searchType === 'email' ? 'email-address' : searchType === 'phone' ? 'phone-pad' : 'default'}
      />
      <Button
        title="Search Database"
        onPress={() => doSearch(1)}
        loading={loading}
        disabled={!query.trim()}
        style={{ marginBottom: SIZES.lg }}
      />

      {/* Results */}
      {results && (
        <>
          <Text style={styles.resultsHeader}>
            {results.total === 0
              ? 'No matches found'
              : `${results.total} result${results.total === 1 ? '' : 's'} found`}
          </Text>

          {results.results?.map((item, i) => (
            <TouchableOpacity
              key={item.id || i}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ReportDetail', { report: item })}
            >
              <Card style={styles.resultCard}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultIcon}>{getResultIcon(item.type)}</Text>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={1}>{item.title || item.scam_type || 'Report'}</Text>
                    <Text style={styles.resultMeta}>
                      {item.scam_type}{item.amount ? ` • $${Number(item.amount).toLocaleString()}` : ''}
                    </Text>
                    {item.summary && (
                      <Text style={styles.resultSummary} numberOfLines={2}>{item.summary}</Text>
                    )}
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                </View>
                <Text style={styles.resultDate}>
                  {new Date(item.created_at).toLocaleDateString()}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}

          {/* Pagination */}
          {results.total > 20 && (
            <View style={styles.pagination}>
              {page > 1 && (
                <Button title="Previous" variant="outline" size="sm" onPress={() => doSearch(page - 1)} />
              )}
              <Text style={styles.pageText}>Page {page}</Text>
              {results.results?.length === 20 && (
                <Button title="Next" variant="outline" size="sm" onPress={() => doSearch(page + 1)} />
              )}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.lg, paddingBottom: 100 },
  heading: { fontSize: SIZES.title, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: SIZES.body, color: COLORS.textSecondary, marginTop: 4, lineHeight: 22, marginBottom: SIZES.sm },
  quotaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceAlt,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    marginBottom: SIZES.md,
  },
  quotaText: { fontSize: SIZES.caption, color: COLORS.textSecondary },
  tabs: { marginBottom: SIZES.md },
  tabsContent: { gap: 8 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontSize: SIZES.body, color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white, fontWeight: '600' },
  resultsHeader: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SIZES.sm },
  resultCard: { marginBottom: SIZES.sm },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: SIZES.sm },
  resultIcon: { fontSize: 28 },
  resultInfo: { flex: 1 },
  resultTitle: { fontSize: SIZES.bodyLg, fontWeight: '600', color: COLORS.textPrimary },
  resultMeta: { fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: 2 },
  resultSummary: { fontSize: SIZES.body, color: COLORS.textSecondary, marginTop: 4, lineHeight: 20 },
  resultDate: { fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: 6, textAlign: 'right' },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: SIZES.md, marginTop: SIZES.md },
  pageText: { fontSize: SIZES.body, color: COLORS.textSecondary },
});
