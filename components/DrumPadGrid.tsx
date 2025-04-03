import React from 'react';
import { StyleSheet, View } from 'react-native';
import DrumPad from './DrumPad';
import { useDrumStore } from '@/stores/drum-store';

export default function DrumPadGrid() {
  const { currentKit } = useDrumStore();
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {currentKit.sounds.map((sound, index) => (
          <DrumPad 
            key={sound.id} 
            sound={sound} 
            colorIndex={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});