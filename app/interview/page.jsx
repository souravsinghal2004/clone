"use client";

import { useEffect, useState, useRef } from "react";

export default function InterviewPage() {
  const [interviewActive, setInterviewActive] = useState(false);
  const [lines, setLines] = useState([]); // store transcript lines
  const [isListening, setIsListening] = useState(false);

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  // ✅ Start Interview
  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      startSpeechToText();
      setInterviewActive(true);
    } catch (error) {
      alert("Allow camera and microphone access.");
      console.error(error);
    }
  };

  // ✅ End Interview
  const endInterview = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    setInterviewActive(false);
  };

  // ✅ NLP API call
  const sendToAPI = async (text) => {
    try {
      const res = await fetch("/api/nlp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.text) {
        setLines((prev) => [...prev, data.text]);
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  // ✅ Speech Recognition setup
  const startSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "auto"; // detects other languages

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      if (interviewActive) recognition.start(); // restart if still in interview
    };

    recognition.onresult = async (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const text = event.results[i][0].transcript.trim();
        if (event.results[i].isFinal && text) {
          await sendToAPI(text);
        }
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {!interviewActive ? (
        <button
          onClick={startInterview}
          style={{
            padding: "1rem 3rem",
            fontSize: "1.5rem",
            background: "red",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Start Interview
        </button>
      ) : (
        <button
          onClick={endInterview}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            padding: "1rem 3rem",
            fontSize: "1.5rem",
            background: "green",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          End Interview
        </button>
      )}

      {/* 🎥 Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "260px",
          height: "190px",
          borderRadius: "10px",
          objectFit: "cover",
          border: "2px solid white",
          zIndex: 500,
          display: interviewActive ? "block" : "none",
        }}
      />

      {/* 💬 Translated Transcript */}
      <div
        style={{
          position: "fixed",
          top: "230px",
          right: "20px",
          width: "300px",
          height: "300px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "10px",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {lines.length > 0 ? (
          lines.map((line, idx) => (
            <p key={idx} style={{ marginBottom: "5px" }}>
              {line}
            </p>
          ))
        ) : (
          <p style={{ opacity: 0.6, textAlign: "center" }}>🎤 Listening...</p>
        )}
      </div>
    </div>
  );
}
