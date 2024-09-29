import { useEffect, useRef, useState } from "react";

type WebAudioProps = {
  format?: AudioFormat;
};

type RecordingStatus =
  | "Recording started..."
  | "Recording stopped. Ready to play!"
  | "Error initializing recorder. Please check your microphone permissions."
  | "Press 'Start Recording' to begin."
  | "Recording paused.";

type RecordingState = "recording" | "finished" | "paused" | "error";

type AudioFormat = "audio/wav" | "audio/mp3" | "audio/ogg" | "audio/mp4";

export function useWebAudio(props?: WebAudioProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>(
    "finished",
  );
  const [status, setStatus] = useState<RecordingStatus>(
    "Press 'Start Recording' to begin.",
  );
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFormat] = useState<AudioFormat>(props?.format ?? "audio/wav");
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
        const audioBlob = new Blob(audioChunksRef.current, {
          type: audioFormat,
        });
        setAudioUrl(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
        setStatus("Recording stopped. Ready to play!");
      };
    } catch (error) {
      console.error("Error initializing recorder:", error);
      setStatus(
        "Error initializing recorder. Please check your microphone permissions.",
      );
    }
  };

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      if (recordingState === "paused") {
        mediaRecorderRef.current.resume();
      } else {
        mediaRecorderRef.current.start();
      }
      setStatus("Recording started...");
      setRecordingState("recording");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setRecordingState("paused");
      setStatus("Recording paused.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecordingState("finished");
    }
  };
  return {
    recordingState,
    status,
    audioUrl,
    startRecording,
    stopRecording,
    pauseRecording,
  };
}
