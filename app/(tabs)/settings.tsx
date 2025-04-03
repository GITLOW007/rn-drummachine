import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SavedBeats from '@/components/SavedBeats';
import Colors from '@/constants/colors';

export default function SavedBeatsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.dark.background}
      />
      
      <SavedBeats />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});