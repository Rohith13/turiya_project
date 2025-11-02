import { useEffect, useRef } from "react";
import * as Tone from "tone";

export const useAmbientSound = (enabled: boolean) => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    const setupAmbient = async () => {
      if (enabled && !synthRef.current) {
        await Tone.start();
        
        // Create a soft ambient synth
        const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "sine" },
          envelope: {
            attack: 4,
            decay: 2,
            sustain: 0.4,
            release: 8,
          },
        }).toDestination();
        
        synth.volume.value = -20; // Soft background volume
        
        // Ambient chord progression
        const notes = [
          ["C4", "E4", "G4"],
          ["A3", "C4", "E4"],
          ["F3", "A3", "C4"],
          ["G3", "B3", "D4"],
        ];
        
        let noteIndex = 0;
        
        const loop = new Tone.Loop((time) => {
          synth.triggerAttackRelease(notes[noteIndex % notes.length], "8n", time);
          noteIndex++;
        }, "8m"); // Very slow, 8 measures between notes
        
        loop.start(0);
        Tone.Transport.start();
        
        synthRef.current = synth;
        loopRef.current = loop;
      } else if (!enabled && synthRef.current) {
        loopRef.current?.stop();
        synthRef.current.dispose();
        Tone.Transport.stop();
        synthRef.current = null;
        loopRef.current = null;
      }
    };

    setupAmbient();

    return () => {
      if (synthRef.current) {
        loopRef.current?.stop();
        synthRef.current.dispose();
        Tone.Transport.stop();
      }
    };
  }, [enabled]);
};
