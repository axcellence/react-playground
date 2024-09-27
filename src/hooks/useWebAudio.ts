import { useRef, useState, useEffect } from "react";

type WebAudioProps = {};

export function useWebAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Press \"Start Recording\" to begin.");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    initializeRecorder();
  }, []);

  const initializeRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];
        setStatus("Recording stopped. Ready to play!");
      };
    } catch (error) {
      console.error("Error initializing recorder:", error);
      setStatus("Error initializing recorder. Please check your microphone permissions.");
    }
  };

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("Recording started...");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatus("Stopping recording...");
    }
  };
  return {
    isRecording,
    status,
    audioUrl,
    startRecording,
    stopRecording,
  };
}
