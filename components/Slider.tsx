import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import RNSlider from '@react-native-community/slider';

interface SliderProps {
  minimumValue: number;
  maximumValue: number;
  value: number;
  onValueChange: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: any;
}

export function Slider({
  minimumValue,
  maximumValue,
  value,
  onValueChange,
  minimumTrackTintColor = '#3f51b5',
  maximumTrackTintColor = '#b3b3b3',
  thumbTintColor = '#3f51b5',
  style,
}: SliderProps) {
  // For web, we'll use a simple input range slider
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style]}>
        <input
          type="range"
          min={minimumValue}
          max={maximumValue}
          step={0.01}
          value={value}
          onChange={(e) => onValueChange(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: 40,
            accentColor: minimumTrackTintColor,
          }}
        />
      </View>
    );
  }

  // For native platforms, use RNSlider
  return (
    <View style={[styles.container, style]}>
      <RNSlider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        thumbTintColor={thumbTintColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});