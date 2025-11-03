import { useEffect, useRef } from "react";
import * as Tone from "tone";

// Configuration for ambient sound layers
const AMBIENT_CONFIG = {
  fadeIn: 10,
  fadeOut: 8,
  breezeVolume: -40,
  oceanVolume: -42,
  reverbDecay: 12,
  breezeLFOFreq: 0.08,
  waveLFOFreq: 0.05,
};

export const useAmbientSound = (enabled: boolean) => {
  // Breeze layer refs
  const breezeNoiseRef = useRef<Tone.Noise | null>(null);
  const breezeFilterRef = useRef<Tone.AutoFilter | null>(null);
  const breezeVolumeRef = useRef<Tone.Volume | null>(null);
  
  // Ocean layer refs
  const oceanLowNoiseRef = useRef<Tone.Noise | null>(null);
  const oceanMidNoiseRef = useRef<Tone.Noise | null>(null);
  const oceanLowFilterRef = useRef<Tone.Filter | null>(null);
  const oceanMidFilterRef = useRef<Tone.Filter | null>(null);
  const oceanTremoloRef = useRef<Tone.Tremolo | null>(null);
  const oceanVolumeRef = useRef<Tone.Volume | null>(null);
  
  // Shared reverb
  const reverbRef = useRef<Tone.Reverb | null>(null);

  useEffect(() => {
    const setupAmbient = async () => {
      if (enabled && !breezeNoiseRef.current) {
        await Tone.start();
        
        // Create shared reverb with longer decay for spatial depth
        const reverb = new Tone.Reverb({ 
          decay: AMBIENT_CONFIG.reverbDecay, 
          wet: 0.4 
        }).toDestination();
        await reverb.generate();
        
        // === BREEZE LAYER ===
        const breezeVolume = new Tone.Volume(-Infinity).connect(reverb);
        const breezeFilter = new Tone.AutoFilter({
          frequency: AMBIENT_CONFIG.breezeLFOFreq,
          type: "sine",
          depth: 0.6,
          baseFrequency: 200,
          octaves: 2.5,
        }).connect(breezeVolume);
        breezeFilter.start();
        
        const breezeNoise = new Tone.Noise("pink");
        breezeNoise.connect(breezeFilter);
        breezeNoise.start();
        
        // === OCEAN WAVE LAYER ===
        const oceanVolume = new Tone.Volume(-Infinity).connect(reverb);
        
        // Low frequency rumble (deep wave)
        const oceanLowFilter = new Tone.Filter(150, "lowpass").connect(oceanVolume);
        const oceanTremolo = new Tone.Tremolo({
          frequency: AMBIENT_CONFIG.waveLFOFreq,
          depth: 0.7,
        }).connect(oceanLowFilter);
        oceanTremolo.start();
        
        const oceanLowNoise = new Tone.Noise("brown");
        oceanLowNoise.connect(oceanTremolo);
        oceanLowNoise.start();
        
        // Mid frequency texture (wave wash)
        const oceanMidFilter = new Tone.Filter({
          type: "bandpass",
          frequency: 500,
          Q: 1,
        }).connect(oceanVolume);
        
        const oceanMidNoise = new Tone.Noise("pink");
        oceanMidNoise.connect(oceanMidFilter);
        oceanMidNoise.start();
        
        // Store refs
        breezeNoiseRef.current = breezeNoise;
        breezeFilterRef.current = breezeFilter;
        breezeVolumeRef.current = breezeVolume;
        oceanLowNoiseRef.current = oceanLowNoise;
        oceanMidNoiseRef.current = oceanMidNoise;
        oceanLowFilterRef.current = oceanLowFilter;
        oceanMidFilterRef.current = oceanMidFilter;
        oceanTremoloRef.current = oceanTremolo;
        oceanVolumeRef.current = oceanVolume;
        reverbRef.current = reverb;
        
        // Smooth fade in with staggered layers
        breezeVolume.volume.rampTo(AMBIENT_CONFIG.breezeVolume, AMBIENT_CONFIG.fadeIn);
        setTimeout(() => {
          oceanVolume.volume.rampTo(AMBIENT_CONFIG.oceanVolume, AMBIENT_CONFIG.fadeIn);
        }, 2000);
        
      } else if (!enabled && breezeNoiseRef.current) {
        // Smooth fade out
        const fadeOutTime = AMBIENT_CONFIG.fadeOut;
        
        if (breezeVolumeRef.current) {
          breezeVolumeRef.current.volume.rampTo(-Infinity, fadeOutTime);
        }
        if (oceanVolumeRef.current) {
          oceanVolumeRef.current.volume.rampTo(-Infinity, fadeOutTime);
        }
        
        // Dispose after fade completes
        setTimeout(() => {
          breezeNoiseRef.current?.stop();
          breezeNoiseRef.current?.dispose();
          breezeFilterRef.current?.dispose();
          breezeVolumeRef.current?.dispose();
          oceanLowNoiseRef.current?.stop();
          oceanLowNoiseRef.current?.dispose();
          oceanMidNoiseRef.current?.stop();
          oceanMidNoiseRef.current?.dispose();
          oceanLowFilterRef.current?.dispose();
          oceanMidFilterRef.current?.dispose();
          oceanTremoloRef.current?.dispose();
          oceanVolumeRef.current?.dispose();
          reverbRef.current?.dispose();
          
          breezeNoiseRef.current = null;
          breezeFilterRef.current = null;
          breezeVolumeRef.current = null;
          oceanLowNoiseRef.current = null;
          oceanMidNoiseRef.current = null;
          oceanLowFilterRef.current = null;
          oceanMidFilterRef.current = null;
          oceanTremoloRef.current = null;
          oceanVolumeRef.current = null;
          reverbRef.current = null;
        }, fadeOutTime * 1000);
      }
    };

    setupAmbient();

    return () => {
      if (breezeNoiseRef.current) {
        const fadeOutTime = AMBIENT_CONFIG.fadeOut;
        
        if (breezeVolumeRef.current) {
          breezeVolumeRef.current.volume.rampTo(-Infinity, fadeOutTime);
        }
        if (oceanVolumeRef.current) {
          oceanVolumeRef.current.volume.rampTo(-Infinity, fadeOutTime);
        }
        
        setTimeout(() => {
          breezeNoiseRef.current?.stop();
          breezeNoiseRef.current?.dispose();
          breezeFilterRef.current?.dispose();
          breezeVolumeRef.current?.dispose();
          oceanLowNoiseRef.current?.stop();
          oceanLowNoiseRef.current?.dispose();
          oceanMidNoiseRef.current?.stop();
          oceanMidNoiseRef.current?.dispose();
          oceanLowFilterRef.current?.dispose();
          oceanMidFilterRef.current?.dispose();
          oceanTremoloRef.current?.dispose();
          oceanVolumeRef.current?.dispose();
          reverbRef.current?.dispose();
        }, fadeOutTime * 1000);
      }
    };
  }, [enabled]);
};
