import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Slider } from '@/components/Slider';
import { useDrumStore } from '@/stores/drum-store';
import { DRUM_KITS } from '@/constants/sounds';
import Colors from '@/constants/colors';
import { Music, Volume2, Mic, Play, Square, Save } from 'lucide-react-native';

export default function ControlPanel() {
  const { 
    volume, 
    setVolume, 
    currentKit, 
    setCurrentKit,
    isRecording,
    startRecording,
    stopRecording,
    currentRecording,
    saveRecording
  } = useDrumStore();
  
  const handleSaveRecording = () => {
    if (currentRecording.length > 0) {
      const beatName = `Beat ${new Date().toLocaleTimeString()}`;
      saveRecording(beatName);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.volumeContainer}>
          <Volume2 size={20} color={Colors.dark.text} />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor={Colors.dark.primary}
            maximumTrackTintColor={Colors.dark.border}
            thumbTintColor={Colors.dark.primary}
          />
          <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={styles.kitSelector}>
          <Music size={20} color={Colors.dark.text} style={styles.icon} />
          <Text style={styles.label}>Kit:</Text>
          <View style={styles.kitButtons}>
            {DRUM_KITS.map(kit => (
              <Pressable
                key={kit.id}
                style={[
                  styles.kitButton,
                  currentKit.id === kit.id && styles.activeKitButton
                ]}
                onPress={() => setCurrentKit(kit.id)}
              >
                <Text 
                  style={[
                    styles.kitButtonText,
                    currentKit.id === kit.id && styles.activeKitButtonText
                  ]}
                >
                  {kit.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={styles.recordingControls}>
          {!isRecording ? (
            <Pressable 
              style={[styles.controlButton, styles.recordButton]} 
              onPress={startRecording}
            >
              <Mic size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Record</Text>
            </Pressable>
          ) : (
            <>
              <Pressable 
                style={[styles.controlButton, styles.stopButton]} 
                onPress={stopRecording}
              >
                <Square size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Stop</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.controlButton, styles.saveButton]} 
                onPress={handleSaveRecording}
              >
                <Save size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </>
          )}
          
          {!isRecording && currentRecording.length > 0 && (
            <Pressable 
              style={[styles.controlButton, styles.saveButton]} 
              onPress={handleSaveRecording}
            >
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  volumeText: {
    color: Colors.dark.text,
    width: 40,
    textAlign: 'right',
  },
  kitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: Colors.dark.text,
    marginRight: 10,
  },
  kitButtons: {
    flexDirection: 'row',
    flex: 1,
  },
  kitButton: {
    backgroundColor: Colors.dark.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  activeKitButton: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  kitButtonText: {
    color: Colors.dark.text,
    fontSize: 14,
  },
  activeKitButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  recordingControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
  },
  recordButton: {
    backgroundColor: Colors.dark.error,
  },
  stopButton: {
    backgroundColor: Colors.dark.warning,
  },
  saveButton: {
    backgroundColor: Colors.dark.success,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});