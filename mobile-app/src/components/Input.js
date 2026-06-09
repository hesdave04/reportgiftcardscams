import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  icon,
  style,
  inputStyle,
  editable = true,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrap,
          focused && styles.inputFocused,
          error && styles.inputError,
          multiline && { height: numberOfLines * 24 + 32 },
          !editable && styles.inputDisabled,
        ]}
      >
        {icon && <Ionicons name={icon} size={18} color={COLORS.textMuted} style={{ marginRight: 8 }} />}
        <TextInput
          style={[styles.input, multiline && styles.multiline, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {maxLength && value && (
        <Text style={styles.counter}>{value.length}/{maxLength}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SIZES.md },
  label: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.md,
    minHeight: SIZES.buttonHeight,
  },
  inputFocused: {
    borderColor: COLORS.secondary,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  inputDisabled: {
    backgroundColor: COLORS.surfaceAlt,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: SIZES.bodyLg,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  multiline: {
    textAlignVertical: 'top',
    paddingTop: SIZES.sm,
  },
  error: {
    fontSize: SIZES.caption,
    color: COLORS.danger,
    marginTop: 4,
  },
  counter: {
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    textAlign: 'right',
    marginTop: 2,
  },
});
