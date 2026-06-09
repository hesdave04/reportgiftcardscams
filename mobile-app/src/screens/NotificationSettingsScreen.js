import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert, Platform, Linking, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { COLORS, SIZES } from '../constants/theme';
import Card from '../components/Card';

export default function NotificationSettingsScreen() {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [settings, setSettings] = useState({
    scamAlerts: true,
    reportUpdates: true,
    weeklyDigest: false,
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  async function checkPermissions() {
    if (!Device.isDevice) {
      setPermissionStatus('simulator');
      return;
    }
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
  }

  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionStatus(status);
    if (status !== 'granted') {
      Alert.alert(
        'Notifications Disabled',
        'To enable notifications, go to Settings > ScamComplaints > Notifications.',
        [
          { text: 'Cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    }
  }

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    // In production, save to backend
  };

  const notifOptions = [
    {
      key: 'scamAlerts',
      title: 'Scam Alerts',
      description: 'Get notified when a scammer you reported is flagged again by another user.',
    },
    {
      key: 'reportUpdates',
      title: 'Report Updates',
      description: 'Notifications about your submitted reports.',
    },
    {
      key: 'weeklyDigest',
      title: 'Weekly Digest',
      description: 'Weekly summary of trending scams and new reports in your area.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Permission status */}
      <Card style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Push Notifications</Text>
            <Text style={styles.statusDesc}>
              {permissionStatus === 'granted'
                ? 'Notifications are enabled'
                : permissionStatus === 'simulator'
                ? 'Not available on simulator'
                : 'Notifications are disabled'}
            </Text>
          </View>
          {permissionStatus !== 'granted' && permissionStatus !== 'simulator' && (
            <Text style={styles.enableBtn} onPress={requestPermissions}>Enable</Text>
          )}
        </View>
      </Card>

      {/* Notification types */}
      <Card style={styles.card}>
        {notifOptions.map((opt, i) => (
          <View key={opt.key} style={[styles.optionRow, i < notifOptions.length - 1 && styles.optionBorder]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.optionTitle}>{opt.title}</Text>
              <Text style={styles.optionDesc}>{opt.description}</Text>
            </View>
            <Switch
              value={settings[opt.key]}
              onValueChange={() => toggleSetting(opt.key)}
              trackColor={{ false: COLORS.border, true: COLORS.accent + '60' }}
              thumbColor={settings[opt.key] ? COLORS.accent : COLORS.textMuted}
              disabled={permissionStatus !== 'granted'}
            />
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SIZES.lg },
  statusCard: { marginBottom: SIZES.md },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusTitle: { fontSize: SIZES.bodyLg, fontWeight: '700', color: COLORS.textPrimary },
  statusDesc: { fontSize: SIZES.body, color: COLORS.textSecondary, marginTop: 2 },
  enableBtn: { fontSize: SIZES.body, fontWeight: '600', color: COLORS.accent },
  card: {},
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  optionBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  optionTitle: { fontSize: SIZES.bodyLg, fontWeight: '600', color: COLORS.textPrimary },
  optionDesc: { fontSize: SIZES.caption, color: COLORS.textMuted, marginTop: 2, lineHeight: 18 },
});
