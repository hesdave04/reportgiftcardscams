import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { getMyReports } from '../lib/api';

export default function MyReportsScreen({ navigation }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = useCallback(async (p = 1, refresh = false) => {
    try {
      const data = await getMyReports(p);
      if (refresh || p === 1) {
        setReports(data.data || []);
      } else {
        setReports((prev) => [...prev, ...(data.data || [])]);
      }
      setTotal(data.total || 0);
      setPage(p);
    } catch (err) {
      console.warn('Load reports failed:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, []);

  const onRefresh = () => { setRefreshing(true); load(1, true); };
  const onLoadMore = () => { if (reports.length < total) load(page + 1); };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ReportDetail', { report: item })}
    >
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.info}>
            <Text style={styles.type}>{item.scam_type || 'Report'}</Text>
            {item.platforms && <Text style={styles.platform}>{item.platforms}</Text>}
            {item.story && (
              <Text style={styles.summary} numberOfLines={2}>
                {item.story}
              </Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
          {item.amount && (
            <Text style={styles.amount}>${Number(item.amount).toLocaleString()}</Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading your reports…</Text>
      </View>
    );
  }

  if (reports.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No reports yet"
        message="Reports you submit will appear here. Help make the internet safer by reporting scams you encounter."
        actionTitle="Report a Scam"
        onAction={() => navigation.navigate('ReportScam')}
      />
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={reports}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      ListHeaderComponent={
        <Text style={styles.header}>{total} report{total === 1 ? '' : 's'} submitted</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SIZES.md, paddingBottom: 100 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: COLORS.textSecondary },
  header: { fontSize: SIZES.body, color: COLORS.textMuted, marginBottom: SIZES.sm },
  card: { marginBottom: SIZES.sm },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1 },
  type: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary },
  platform: { fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: 2 },
  summary: { fontSize: SIZES.body, color: COLORS.textSecondary, marginTop: 4, lineHeight: 20 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.sm,
    paddingTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  date: { fontSize: SIZES.caption, color: COLORS.textMuted },
  amount: { fontSize: SIZES.caption, fontWeight: '600', color: COLORS.danger },
});
