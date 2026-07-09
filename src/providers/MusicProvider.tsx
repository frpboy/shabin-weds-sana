import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ 
  children, 
  audioUrl = '/audio/ambient.mp3' 
}: { 
  children: React.ReactNode; 
  audioUrl?: string; 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasFadedInRef = useRef(false);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [audioUrl]);

  // Handle tab visibility and window focus changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          wasPlayingRef.current = true;
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingRef.current && audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            wasPlayingRef.current = false;
          }).catch(() => {
            setIsPlaying(false);
          });
        }
      }
    };

    const handleWindowBlur = () => {
      if (isPlaying) {
        wasPlayingRef.current = true;
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleWindowFocus = () => {
      if (wasPlayingRef.current && audioRef.current && !document.hidden) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          wasPlayingRef.current = false;
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isPlaying]);

  const startFadeIn = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = 0.0;
    const targetVolume = 0.25;
    const durationMs = 5000;
    const intervalMs = 50;
    const steps = durationMs / intervalMs;
    const stepVolume = (targetVolume - startVolume) / steps;

    let currentVolume = startVolume;
    audioRef.current.volume = currentVolume;
    setVolumeState(currentVolume);

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      currentVolume = Math.min(targetVolume, currentVolume + stepVolume);
      audioRef.current.volume = currentVolume;
      setVolumeState(currentVolume);

      if (currentVolume >= targetVolume) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, intervalMs);
  };

  const setVolume = (v: number) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      wasPlayingRef.current = false;
      if (!hasFadedInRef.current) {
        startFadeIn();
        hasFadedInRef.current = true;
      } else if (audioRef.current && audioRef.current.volume === 0) {
        startFadeIn();
      }
    }).catch(() => {
      setIsPlaying(false);
    });
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    audioRef.current.volume = 0;
    setVolumeState(0);
    setIsPlaying(false);
    wasPlayingRef.current = false;
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, play, pause, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
