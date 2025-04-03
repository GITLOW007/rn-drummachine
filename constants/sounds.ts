export interface DrumSound {
    id: string;
    name: string;
    description: string;
    soundUrl: string;
  }
  
  export interface DrumKit {
    id: string;
    name: string;
    description: string;
    sounds: DrumSound[];
  }
  
  export const DRUM_KITS: DrumKit[] = [
    {
      id: 'basic',
      name: 'Basic Kit',
      description: 'A standard drum kit with basic sounds',
      sounds: [
        {
          id: 'kick',
          name: 'Kick',
          description: 'Bass drum',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2599/2599-preview.mp3',
        },
        {
          id: 'snare',
          name: 'Snare',
          description: 'Snare drum',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/1662/1662-preview.mp3',
        },
        {
          id: 'hihat-closed',
          name: 'Hi-Hat Closed',
          description: 'Closed hi-hat',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2606/2606-preview.mp3',
        },
        {
          id: 'hihat-open',
          name: 'Hi-Hat Open',
          description: 'Open hi-hat',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2608/2608-preview.mp3',
        },
        {
          id: 'tom1',
          name: 'Tom 1',
          description: 'High tom',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2610/2610-preview.mp3',
        },
        {
          id: 'tom2',
          name: 'Tom 2',
          description: 'Mid tom',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2609/2609-preview.mp3',
        },
        {
          id: 'crash',
          name: 'Crash',
          description: 'Crash cymbal',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2604/2604-preview.mp3',
        },
        {
          id: 'ride',
          name: 'Ride',
          description: 'Ride cymbal',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2605/2605-preview.mp3',
        },
        {
          id: 'clap',
          name: 'Clap',
          description: 'Hand clap',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2107/2107-preview.mp3',
        },
      ],
    },
    {
      id: 'electronic',
      name: 'Electronic Kit',
      description: 'Electronic drum sounds for modern music',
      sounds: [
        {
          id: 'e-kick',
          name: 'E-Kick',
          description: 'Electronic kick',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2771/2771-preview.mp3',
        },
        {
          id: 'e-snare',
          name: 'E-Snare',
          description: 'Electronic snare',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2774/2774-preview.mp3',
        },
        {
          id: 'e-hihat',
          name: 'E-HiHat',
          description: 'Electronic hi-hat',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2606/2606-preview.mp3',
        },
        {
          id: 'e-clap',
          name: 'E-Clap',
          description: 'Electronic clap',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2107/2107-preview.mp3',
        },
        {
          id: 'e-perc1',
          name: 'E-Perc 1',
          description: 'Electronic percussion 1',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2772/2772-preview.mp3',
        },
        {
          id: 'e-perc2',
          name: 'E-Perc 2',
          description: 'Electronic percussion 2',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2773/2773-preview.mp3',
        },
        {
          id: 'e-fx1',
          name: 'E-FX 1',
          description: 'Electronic effect 1',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2775/2775-preview.mp3',
        },
        {
          id: 'e-fx2',
          name: 'E-FX 2',
          description: 'Electronic effect 2',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2776/2776-preview.mp3',
        },
        {
          id: 'e-fx3',
          name: 'E-FX 3',
          description: 'Electronic effect 3',
          soundUrl: 'https://assets.mixkit.co/active_storage/sfx/2777/2777-preview.mp3',
        },
      ],
    },
  ];