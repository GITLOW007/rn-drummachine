import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DRUM_KITS, DrumKit, DrumSound } from '@/constants/sounds';

interface RecordedBeat {
  id: string;
  name: string;
  timestamp: number;
  sequence: {
    soundId: string;
    time: number;
  }[];
}

interface DrumState {
  currentKit: DrumKit;
  volume: number;
  isRecording: boolean;
  recordingStartTime: number | null;
  currentRecording: {
    soundId: string;
    time: number;
  }[];
  savedBeats: RecordedBeat[];
  metronomeEnabled: boolean;
  bpm: number;
  activePads: Record<string, boolean>;
  
  // Actions
  setCurrentKit: (kitId: string) => void;
  setVolume: (volume: number) => void;
  startRecording: () => void;
  stopRecording: () => void;
  addToRecording: (soundId: string) => void;
  saveRecording: (name: string) => void;
  deleteRecording: (id: string) => void;
  setMetronomeEnabled: (enabled: boolean) => void;
  setBpm: (bpm: number) => void;
  setActivePad: (padId: string, active: boolean) => void;
}

export const useDrumStore = create<DrumState>()(
  persist(
    (set, get) => ({
      currentKit: DRUM_KITS[0],
      volume: 0.8,
      isRecording: false,
      recordingStartTime: null,
      currentRecording: [],
      savedBeats: [],
      metronomeEnabled: false,
      bpm: 120,
      activePads: {},
      
      setCurrentKit: (kitId: string) => {
        const kit = DRUM_KITS.find(k => k.id === kitId);
        if (kit) {
          set({ currentKit: kit });
        }
      },
      
      setVolume: (volume: number) => {
        set({ volume });
      },
      
      startRecording: () => {
        set({ 
          isRecording: true, 
          recordingStartTime: Date.now(),
          currentRecording: [] 
        });
      },
      
      stopRecording: () => {
        set({ isRecording: false });
      },
      
      addToRecording: (soundId: string) => {
        const { isRecording, recordingStartTime, currentRecording } = get();
        
        if (isRecording && recordingStartTime) {
          const time = Date.now() - recordingStartTime;
          set({
            currentRecording: [
              ...currentRecording,
              { soundId, time }
            ]
          });
        }
      },
      
      saveRecording: (name: string) => {
        const { currentRecording, savedBeats } = get();
        
        if (currentRecording.length > 0) {
          const newBeat: RecordedBeat = {
            id: Date.now().toString(),
            name,
            timestamp: Date.now(),
            sequence: [...currentRecording]
          };
          
          set({
            savedBeats: [...savedBeats, newBeat],
            currentRecording: [],
            recordingStartTime: null
          });
        }
      },
      
      deleteRecording: (id: string) => {
        const { savedBeats } = get();
        set({
          savedBeats: savedBeats.filter(beat => beat.id !== id)
        });
      },
      
      setMetronomeEnabled: (enabled: boolean) => {
        set({ metronomeEnabled: enabled });
      },
      
      setBpm: (bpm: number) => {
        set({ bpm });
      },
      
      setActivePad: (padId: string, active: boolean) => {
        set(state => ({
          activePads: {
            ...state.activePads,
            [padId]: active
          }
        }));
      }
    }),
    {
      name: 'drum-machine-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);