import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Platform, StyleSheet, KeyboardAvoidingView,
} from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen({ navigation }) {
  const { signIn, signUp, resetPassword, signInWithApple } = useAuth();
  const [mode, setMode] = useState('signin'); // signin | signup | forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (mode !== 'forgot') {
      if (!password) e.password = 'Password is required';
      else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    }
    if (mode === 'signup' && !displayName.trim()) e.displayName = 'Display name is required';
    if (mode === 'signup' && !ageConfirmed) e.age = 'You must be 13 or older to use this app';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn(email.trim(), password);
      } else if (mode === 'signup') {
        await signUp(email.trim(), password, displayName.trim());
        Alert.alert('Check your email', 'We sent you a confirmation link. Please verify your email to continue.');
      } else {
        await resetPassword(email.trim());
        Alert.alert('Reset email sent', 'Check your inbox for password reset instructions.');
        setMode('signin');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const nonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        Crypto.getRandomBytes(32).toString()
      );
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce,
      });
      if (credential.identityToken) {
        await signInWithApple(credential.identityToken, nonce);
      }
    } catch (err) {
      if (err.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple Sign-In Failed', err.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🚨</Text>
          <Text style={styles.appName}>ScamComplaints</Text>
          <Text style={styles.tagline}>
            {mode === 'signin' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset your password'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {mode === 'signup' && (
            <Input
              label="Display Name"
              placeholder="Your name"
              value={displayName}
              onChangeText={setDisplayName}
              error={errors.displayName}
              autoCapitalize="words"
              icon="person-outline"
            />
          )}
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            icon="mail-outline"
          />
          {mode !== 'forgot' && (
            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
              icon="lock-closed-outline"
            />
          )}

          {mode === 'signup' && (
            <TouchableOpacity
              style={styles.ageCheck}
              onPress={() => setAgeConfirmed(!ageConfirmed)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={ageConfirmed ? 'checkbox' : 'square-outline'}
                size={22}
                color={errors.age ? COLORS.danger : ageConfirmed ? COLORS.accent : COLORS.textMuted}
              />
              <Text style={[styles.ageText, errors.age && { color: COLORS.danger }]}>
                I confirm I am 13 years of age or older
              </Text>
            </TouchableOpacity>
          )}

          {mode === 'signin' && (
            <TouchableOpacity onPress={() => setMode('forgot')} style={{ alignSelf: 'flex-end', marginBottom: SIZES.md }}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          <Button
            title={mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            onPress={handleSubmit}
            loading={loading}
          />

          {/* Social sign-in */}
          {mode !== 'forgot' && (
            <>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {Platform.OS === 'ios' && (
                <AppleAuthentication.AppleAuthenticationButton
                  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                  buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                  cornerRadius={SIZES.radius}
                  style={styles.appleBtn}
                  onPress={handleAppleSignIn}
                />
              )}
            </>
          )}
        </View>

        {/* Toggle mode */}
        <View style={styles.toggle}>
          <Text style={styles.toggleText}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          </Text>
          <TouchableOpacity onPress={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setErrors({}); }}>
            <Text style={styles.linkText}>
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Legal links */}
        <View style={styles.legal}>
          <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.legalSep}>•</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
            <Text style={styles.legalLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SIZES.lg, paddingTop: 80, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: SIZES.xl },
  logo: { fontSize: 56 },
  appName: { fontSize: SIZES.heading, fontWeight: '800', color: COLORS.textPrimary, marginTop: SIZES.sm },
  tagline: { fontSize: SIZES.bodyLg, color: COLORS.textSecondary, marginTop: 4 },
  form: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    ...SHADOWS.md,
  },
  ageCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: SIZES.md,
  },
  ageText: { fontSize: SIZES.body, color: COLORS.textSecondary, flex: 1 },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.lg,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { marginHorizontal: SIZES.md, color: COLORS.textMuted, fontSize: SIZES.body },
  appleBtn: { width: '100%', height: SIZES.buttonHeight },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.lg,
  },
  toggleText: { color: COLORS.textSecondary, fontSize: SIZES.body },
  linkText: { color: COLORS.accent, fontSize: SIZES.body, fontWeight: '600' },
  legal: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.lg,
    gap: 8,
  },
  legalLink: { color: COLORS.textMuted, fontSize: SIZES.caption },
  legalSep: { color: COLORS.textMuted, fontSize: SIZES.caption },
});
