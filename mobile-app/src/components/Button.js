import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function Button({
  title,
  onPress,
  variant = 'primary', // primary | secondary | outline | danger | ghost
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) {
  const isDisabled = disabled || loading;

  const bgColor = {
    primary: COLORS.accent,
    secondary: COLORS.primary,
    outline: 'transparent',
    danger: COLORS.danger,
    ghost: 'transparent',
  }[variant];

  const textColor = {
    primary: COLORS.white,
    secondary: COLORS.white,
    outline: COLORS.primary,
    danger: COLORS.white,
    ghost: COLORS.accent,
  }[variant];

  const borderColor = variant === 'outline' ? COLORS.border : 'transparent';

  const heights = { sm: 40, md: SIZES.buttonHeight, lg: 58 };
  const fontSizes = { sm: 14, md: 16, lg: 18 };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        {
          backgroundColor: bgColor,
          borderColor,
          height: heights[size],
          opacity: isDisabled ? 0.5 : 1,
        },
        variant === 'outline' && styles.outline,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: textColor, fontSize: fontSizes[size] }, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.lg,
    gap: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  outline: {
    borderWidth: 1.5,
  },
  text: {
    fontWeight: '600',
  },
});
