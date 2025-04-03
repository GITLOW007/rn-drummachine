import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useDrumStore } from '@/stores/drum-store';
import { playSound } from '@/utils/sound-utils';
import Colors from '@/constants/colors';
import { Play, Trash2 } from 'lucide-react-native';

export default function SavedBeats() {
  const { savedBeats, deleteRecording, currentKit, volume } = useDrumStore();
  
  const playBeat = async (beatId: string) => {
    const beat = savedBeats.find(b => b.id === beatId);
    if (!beat) return;
    
    // Sort the sequence by time
    const sortedSequence = [...beat.sequence].sort((a, b) => a.time - b.time);
    
    // Play each sound at the appropriate time
    for (const note of sortedSequence) {
      const sound = currentKit.sounds.find(s => s.id === note.soundId);
      if (sound) {
        // Calculate delay based on the time in the sequence
        const delay = note.time;
        
        // Use setTimeout to play the sound at the right time
        setTimeout(() => {
          playSound(sound.soundUrl, volume);
        }, delay);
      }
    }
  };
  
  if (savedBeats.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No saved beats yet</Text>
        <Text style={styles.emptySubtext}>Record and save your beats to see them here</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Beats</Text>
      {savedBeats.map(beat => (
        <View key={beat.id} style={styles.beatItem}>
          <View style={styles.beatInfo}>
            <Text style={styles.beatName}>{beat.name}</Text>
            <Text style={styles.beatDate}>
              {new Date(beat.timestamp).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.beatActions}>
            <Pressable
              style={[styles.beatButton, styles.playButton]}
              onPress={() => playBeat(beat.id)}
            >
              <Play size={16} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={[styles.beatButton, styles.deleteButton]}
              onPress={() => deleteRecording(beat.id)}
            >
              <Trash2 size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  beatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  beatInfo: {
    flex: 1,
  },
  beatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  beatDate: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginTop: 4,
  },
  beatActions: {
    flexDirection: 'row',
    gap: 8,
  },
  beatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: Colors.dark.primary,
  },
  deleteButton: {
    backgroundColor: Colors.dark.error,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
});