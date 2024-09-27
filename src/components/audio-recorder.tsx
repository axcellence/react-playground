import { useRef } from "react";
import { useWebAudio } from "../hooks/useWebAudio";

export function AudioRecorder() {
  const startBtnRef = useRef<HTMLButtonElement | null>(null);
  const stopBtnRef = useRef<HTMLButtonElement | null>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

  const { isRecording, status, audioUrl, startRecording, stopRecording } = useWebAudio();

  return (
    <div>
      <div>
        <button
          ref={startBtnRef}
          onClick={startRecording}
          disabled={isRecording}
        >
          Start Recording
        </button>
        <button
          ref={stopBtnRef}
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Stop Recording
        </button>
      </div>
      <audio
        ref={audioPlaybackRef}
        controls
        src={audioUrl ?? undefined}
        hidden={!audioUrl}
      />
      <div id="status">{status}</div>
    </div>
  )
}