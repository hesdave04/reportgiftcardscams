import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Button from './Button';

export default function EmptyState({ icon, title, message, actionTitle, onAction }) {
  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {actionTitle && onAction && (
        <Button title={actionTitle} onPress={onAction} size="sm" style={{ marginTop: SIZES.md }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xl,
  },
  icon: { fontSize: 48, marginBottom: SIZES.md },
  title: {
    fontSize: SIZES.subtitle,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SIZES.sm,
    lineHeight: 22,
  },
});
