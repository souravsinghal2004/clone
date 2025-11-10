"use client";
import React, { useState, useEffect, useRef } from "react";

const InterviewPage = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US"; // Force English transcription

        recognition.onresult = async (event) => {
          let text = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
          }

          // Detect Hindi or other non-English chars → translate
          if (/[^\u0000-\u007F]/.test(text)) {
            const translated = await translateToEnglish(text);
            setTranscript(translated);
          } else {
            setTranscript(text);
          }
        };

        recognitionRef.current = recognition;
      } else {
        console.error("Speech Recognition not supported in this browser.");
      }
    }
  }, []);

  // Backup translation (Hindi → English)
  const translateToEnglish = async (text) => {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=hi|en`
      );
      const data = await res.json();
      return data.responseData.translatedText || text;
    } catch (err) {
      console.error("Translation error:", err);
      return text;
    }
  };

  const handleStart = async () => {
    setIsRecording(true);

    // Go fullscreen for the entire page
    const elem = document.documentElement;
    if (elem.requestFullscreen) await elem.requestFullscreen();

    // Start mic + recognition
    recognitionRef.current.start();

    // Start webcam
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera or mic error:", err);
    }
  };

  const handleStop = async () => {
    setIsRecording(false);

    // Stop recognition
    if (recognitionRef.current) recognitionRef.current.stop();

    // Stop all media tracks (camera + mic)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // Exit fullscreen
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">AI Interview</h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-80 h-60 border-2 border-green-400 rounded-xl mb-4 transform scale-x-[-1]"
      />

      <div className="flex gap-4">
        {!isRecording ? (
          <button
            onClick={handleStart}
            className="bg-green-500 px-5 py-2 rounded-lg text-black font-semibold"
          >
            Start Interview
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="bg-red-600 px-5 py-2 rounded-lg text-white font-semibold"
          >
            End Interview
          </button>
        )}
      </div>

      <div className="mt-6 w-[80%] bg-[#1a1a1a] p-4 rounded-lg min-h-[150px]">
        <p>{transcript || "Start speaking..."}</p>
      </div>
    </div>
  );
};

export default InterviewPage;
