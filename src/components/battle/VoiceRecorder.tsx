"use client";

import { useState } from "react";
import { Mic, Send, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface VoiceRecorderProps {
  maxDuration: number;
  onSubmit: (roastText: string) => void;  // ✅ Now expects roastText parameter
}

export function VoiceRecorder({ maxDuration, onSubmit }: VoiceRecorderProps) {
  const [mode, setMode] = useState<"voice" | "text">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [textRoast, setTextRoast] = useState("");

  const handleRecordStart = () => {
    setIsRecording(true);
  };

  const handleRecordEnd = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleTextSubmit = () => {
    if (textRoast.trim()) {
      onSubmit(textRoast);  // ✅ PASS THE TEXT!
      setTextRoast("");  // Clear after submit
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4 pb-32 overflow-y-auto">
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setMode("text")}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
            mode === "text"
              ? "bg-fire text-white"
              : "bg-dark-lighter text-gray-400 hover:text-white"
          )}
        >
          <Keyboard className="w-4 h-4" />
          Text
        </button>
        <button
          onClick={() => setMode("voice")}
          className={cn(
            "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
            mode === "voice"
              ? "bg-fire text-white"
              : "bg-dark-lighter text-gray-400 hover:text-white"
          )}
        >
          <Mic className="w-4 h-4" />
          Voice
        </button>
      </div>

      {mode === "text" && (
        <div className="space-y-3 pb-20">
          <p className="text-center text-gray-400 text-sm">
            Type your roast below
          </p>

          <div className="relative">
            <textarea
              value={textRoast}
              onChange={(e) => setTextRoast(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your roast here..."
              className="w-full bg-dark-lighter border border-gray-700 rounded-xl p-4 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-fire transition-colors"
              rows={4}
              maxLength={280}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {textRoast.length}/280
            </div>
          </div>

          <Button
            onClick={handleTextSubmit}
            disabled={!textRoast.trim()}
            className="w-full gap-2 text-lg py-6"
            size="lg"
          >
            <Send className="w-5 h-5" />
            Submit Roast
          </Button>
        </div>
      )}

      {mode === "voice" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-gray-400">
            {isRecording ? "Recording..." : "Hold to record your roast"}
          </p>

          <button
            onMouseDown={handleRecordStart}
            onMouseUp={handleRecordEnd}
            onTouchStart={handleRecordStart}
            onTouchEnd={handleRecordEnd}
            className={cn(
              "w-32 h-32 rounded-full flex items-center justify-center transition-all",
              isRecording
                ? "bg-fire scale-110 animate-pulse"
                : "bg-fire/20 hover:bg-fire/30"
            )}
          >
            <Mic
              className={cn(
                "w-16 h-16",
                isRecording ? "text-white" : "text-fire"
              )}
            />
          </button>

          {hasRecording && (
            <Button onClick={() => onSubmit("")} className="gap-2" size="lg">
              <Send className="w-5 h-5" />
              Submit Recording
            </Button>
          )}
        </div>
      )}
    </div>
  );
}