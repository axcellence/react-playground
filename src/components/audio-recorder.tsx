import {
  DownloadIcon,
  MicIcon,
  MicOffIcon,
  PauseIcon,
} from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { useWebAudio } from "../hooks/use-web-audio";

export function AudioRecorder() {
  const {
    recordingState,
    status,
    audioUrl,
    startRecording,
    stopRecording,
    pauseRecording,
  } = useWebAudio();


  return (
    <div className="border border-input rounded-md p-2 place-content-center space-y-2">
      <div className="text-sm text-muted-foreground">{status}</div>
      <div className="fle flex-row gap-2">
        {recordingState !== "recording" && (
          <Button
            onClick={startRecording}
            variant="ghost"
            size="icon"
            className={cn(
              "disabled:hidden disabled:opacity-20 disabled:pointer-events-none",
            )}
          >
            <MicIcon />
            <span className="sr-only">Start Recording</span>
          </Button>
        )}
        {recordingState === "recording" && (
          <>
            <Button
              onClick={pauseRecording}
              variant="ghost"
              size="icon"
            >
              <PauseIcon />
              <span className="sr-only">Pause Recording</span>
            </Button>
            <Button
              onClick={stopRecording}
              variant="ghost"
              size="icon"
            >
              <MicOffIcon />
              <span className="sr-only">End Recording</span>
            </Button>

          </>
        )}
      </div>
      {(recordingState === "finished" && audioUrl) && (
        <div className="flex items-center gap-5">
          <audio
            controls
            src={audioUrl}
            controlsList="nodownload"
            className="w-full"
          />

          <Button
            asChild
            variant="ghost"
            size="icon"
          >
            <a
              href={audioUrl ?? undefined}
              download
            >

              <DownloadIcon />
              <span className="sr-only">Download</span>
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
