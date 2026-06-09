import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    icon: '🚨',
    title: 'Report Scams Instantly',
    description: 'File a scam report in under 2 minutes. Your report warns others and helps investigators track fraud networks.',
  },
  {
    icon: '🔍',
    title: 'Look Up Scam Data',
    description: 'Search our database by email, phone number, name, or website to check if someone has been reported before.',
  },
  {
    icon: '🛡️',
    title: 'Protect Yourself & Others',
    description: 'Get alerts when scammers you reported are active again. Every report makes the internet safer for everyone.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setHasOnboarded } = useAuth();

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      setHasOnboarded(true);
      navigation.replace('Auth');
    }
  };

  const handleSkip = () => {
    setHasOnboarded(true);
    navigation.replace('Auth');
  };

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
        <Button
          title={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  skipBtn: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    color: COLORS.textMuted,
    fontSize: SIZES.bodyLg,
    fontWeight: '500',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xl,
  },
  icon: {
    fontSize: 72,
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.heading,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.md,
  },
  description: {
    fontSize: SIZES.bodyLg,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: SIZES.md,
  },
  footer: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 50,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    marginBottom: SIZES.lg,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryLight,
  },
  dotActive: {
    backgroundColor: COLORS.accent,
    width: 24,
  },
});
