import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { COLORS, SIZES } from './src/constants/theme';

// Screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReportScamScreen from './src/screens/ReportScamScreen';
import QuickReportScreen from './src/screens/QuickReportScreen';
import ScamLookupScreen from './src/screens/ScamLookupScreen';
import MyReportsScreen from './src/screens/MyReportsScreen';
import ReportDetailScreen from './src/screens/ReportDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import AboutScreen from './src/screens/AboutScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const defaultScreenOptions = {
  headerStyle: { backgroundColor: COLORS.surface },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: { fontWeight: '600', fontSize: SIZES.bodyLg },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  contentStyle: { backgroundColor: COLORS.background },
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Report: focused ? 'alert-circle' : 'alert-circle-outline',
            Lookup: focused ? 'search' : 'search-outline',
            Reports: focused ? 'document-text' : 'document-text-outline',
            Profile: focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.tabActive,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.borderLight,
          height: SIZES.tabBarHeight,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={ReportScamScreen} options={{ title: 'Report' }} />
      <Tab.Screen name="Lookup" component={ScamLookupScreen} options={{ title: 'Lookup' }} />
      <Tab.Screen name="Reports" component={MyReportsScreen} options={{ title: 'My Reports' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user, loading, hasOnboarded } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      {!user ? (
        // Auth flow
        <>
          {!hasOnboarded && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
          <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{ title: 'Terms of Service' }} />
        </>
      ) : (
        // Main app
        <>
          <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="ReportScam" component={ReportScamScreen} options={{ title: 'Report a Scam' }} />
          <Stack.Screen name="QuickReport" component={QuickReportScreen} options={{ title: 'Quick Report' }} />
          <Stack.Screen name="ScamLookup" component={ScamLookupScreen} options={{ title: 'Scam Lookup' }} />
          <Stack.Screen name="MyReports" component={MyReportsScreen} options={{ title: 'My Reports' }} />
          <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ title: 'Report Details' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Settings' }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
          <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{ title: 'Terms of Service' }} />
          <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
          <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ title: 'Notifications' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
