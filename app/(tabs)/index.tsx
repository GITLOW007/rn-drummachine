import React, { useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrumPadGrid from '@/components/DrumPadGrid';
import ControlPanel from '@/components/ControlPanel';
import Colors from '@/constants/colors';
import { initializeAudio, unloadSounds } from '@/utils/sound-utils';
import { useDrumStore } from '@/stores/drum-store';

export default function DrumMachineScreen() {
  const { currentKit } = useDrumStore();
  
  // Initialize audio when component mounts
  useEffect(() => {
    initializeAudio();
    
    // Clean up sounds when component unmounts
    return () => {
      unloadSounds();
    };
  }, []);
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.dark.background}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Drum Machine</Text>
        <Text style={styles.subtitle}>{currentKit.name}</Text>
      </View>
      
      <DrumPadGrid />
      
      <ControlPanel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    backgroundColor: Colors.dark.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginTop: 4,
  },
});