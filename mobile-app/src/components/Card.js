import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function Card({ children, style, padding = SIZES.md }) {
  return (
    <View style={[styles.card, { padding }, SHADOWS.sm, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
});
