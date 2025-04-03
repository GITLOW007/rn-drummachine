import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  Pressable, 
  View,
  Animated,
} from 'react-native';
import { DrumSound } from '@/constants/sounds';
import { playSound } from '@/utils/sound-utils';
import { useDrumStore } from '@/stores/drum-store';
import Colors from '@/constants/colors';

interface DrumPadProps {
  sound: DrumSound;
  colorIndex: number;
}

export default function DrumPad({ sound, colorIndex }: DrumPadProps) {
  const { volume, addToRecording, setActivePad } = useDrumStore();
  const [animation] = useState(new Animated.Value(1));
  
  const handlePress = async () => {
    // Play the sound
    await playSound(sound.soundUrl, volume);
    
    // Add to recording if recording is active
    addToRecording(sound.id);
    
    // Animate the pad
    setActivePad(sound.id, true);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActivePad(sound.id, false);
    });
  };
  
  return (
    <Animated.View
      style={[
        styles.padContainer,
        {
          transform: [{ scale: animation }],
        },
      ]}
    >
      <Pressable
        style={[
          styles.pad,
          { backgroundColor: Colors.padColors[colorIndex % Colors.padColors.length] }
        ]}
        onPress={handlePress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: false }}
      >
        <Text style={styles.padText}>{sound.name}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  padContainer: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  pad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  padText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});