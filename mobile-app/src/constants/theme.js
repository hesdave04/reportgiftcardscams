// ScamComplaints brand colors & shared design tokens
export const COLORS = {
  // Primary — dark navy (from scamcomplaints.org)
  primary: '#0F172A',
  primaryLight: '#1E293B',
  primaryDark: '#020617',

  // Accent — red (alert/action color)
  accent: '#DC2626',
  accentLight: '#EF4444',
  accentDark: '#B91C1C',

  // Secondary — blue
  secondary: '#3B82F6',
  secondaryLight: '#60A5FA',
  secondaryDark: '#2563EB',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#DC2626',
  info: '#3B82F6',

  // Neutrals
  white: '#FFFFFF',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  overlay: 'rgba(15, 23, 42, 0.5)',

  // Tab bar
  tabActive: '#DC2626',
  tabInactive: '#94A3B8',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
};

export const SIZES = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Font sizes
  caption: 12,
  body: 14,
  bodyLg: 16,
  subtitle: 18,
  title: 22,
  heading: 28,
  hero: 34,

  // Radius
  radiusSm: 8,
  radius: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 9999,

  // Misc
  headerHeight: 56,
  tabBarHeight: 80,
  buttonHeight: 52,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
