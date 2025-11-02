import { useEffect, useRef } from "react";
import * as Tone from "tone";

export const useAmbientSound = (enabled: boolean) => {
  const noiseRef = useRef<Tone.Noise | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const synthRef = useRef<Tone.Synth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    const setupAmbient = async () => {
      if (enabled && !noiseRef.current) {
        await Tone.start();
        
        // Create ambient layers
        const reverb = new Tone.Reverb({ decay: 8, wet: 0.5 }).toDestination();
        const filter = new Tone.Filter(300, "lowpass").connect(reverb);
        
        // Soft noise (wind-like)
        const noise = new Tone.Noise("pink");
        noise.volume.value = -35;
        noise.connect(filter);
        noise.start();
        
        // Deep meditation drone
        const synth = new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: {
            attack: 8,
            decay: 0,
            sustain: 1,
            release: 8,
          },
        }).connect(reverb);
        
        synth.volume.value = -28;
        
        // Slow evolving pad
        const notes = ["C2", "G2", "C3", "E3"];
        let noteIndex = 0;
        
        const loop = new Tone.Loop((time) => {
          synth.triggerAttackRelease(notes[noteIndex % notes.length], "16n", time);
          noteIndex++;
        }, "16m");
        
        loop.start(0);
        Tone.Transport.start();
        
        noiseRef.current = noise;
        filterRef.current = filter;
        reverbRef.current = reverb;
        synthRef.current = synth;
        loopRef.current = loop;
      } else if (!enabled && noiseRef.current) {
        loopRef.current?.stop();
        noiseRef.current?.stop();
        noiseRef.current?.dispose();
        filterRef.current?.dispose();
        reverbRef.current?.dispose();
        synthRef.current?.dispose();
        Tone.Transport.stop();
        noiseRef.current = null;
        filterRef.current = null;
        reverbRef.current = null;
        synthRef.current = null;
        loopRef.current = null;
      }
    };

    setupAmbient();

    return () => {
      if (noiseRef.current) {
        loopRef.current?.stop();
        noiseRef.current?.stop();
        noiseRef.current?.dispose();
        filterRef.current?.dispose();
        reverbRef.current?.dispose();
        synthRef.current?.dispose();
        Tone.Transport.stop();
      }
    };
  }, [enabled]);
};
