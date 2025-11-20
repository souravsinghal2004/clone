"use client";

import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import webgazer from "webgazer";

export default function InterviewPage() {
  const [phase, setPhase] = useState("idle"); // idle | calibrating | interviewing
  const [isLookingAtScreen, setIsLookingAtScreen] = useState(true);
  const webcamRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  // Start mic & camera
  const startCameraAndMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = stream;
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }

      // Setup voice recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.current.push(event.data);
      };
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Camera/Mic error:", err);
    }
  };

  // Stop mic & camera
  const stopCameraAndMic = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  // Calibration first, then interview
  const startInterview = async () => {
    await startCameraAndMic();
    setPhase("calibrating");

    setTimeout(() => {
      setPhase("interviewing");
      document.documentElement.requestFullscreen().catch(() => {});
    }, 4000); // 4s calibration
  };

  // End interview
  const endInterview = () => {
    stopCameraAndMic();
    document.exitFullscreen().catch(() => {});
    setPhase("idle");
    webgazer.end();
  };

  // Eye tracking setup (WebGazer)
  useEffect(() => {
    if (phase !== "interviewing") return;

    webgazer.setRegression("ridge")
      .setTracker("clmtrackr")
      .setGazeListener((data) => {
        if (!data) return;

        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const dx = Math.abs(data.x - target.x);
        const dy = Math.abs(data.y - target.y);
        const THRESHOLD_PX = 180;
        const onScreen = dx < THRESHOLD_PX && dy < THRESHOLD_PX;
        setIsLookingAtScreen(onScreen);
      })
      .begin();

    // Hide debug video preview
    webgazer.showVideoPreview(false).showPredictionPoints(false);

    return () => {
      webgazer.clearGazeListener();
    };
  }, [phase]);

  // When “Add Interview” is clicked — close mic/cam
  const handleAddInterview = () => {
    stopCameraAndMic();
    setPhase("idle");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${
        phase === "interviewing"
          ? isLookingAtScreen
            ? "border-8 border-green-500"
            : "border-8 border-red-500"
          : ""
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">
        {phase === "idle" && "Interview Setup"}
        {phase === "calibrating" && "Calibrating... Please look at the screen"}
        {phase === "interviewing" && "Interview in Progress"}
      </h1>

      {/* Webcam only visible during calibration & interview */}
      {(phase === "calibrating" || phase === "interviewing") && (
        <div className="rounded-2xl overflow-hidden shadow-md">
          <Webcam
            ref={webcamRef}
            mirrored
            audio={false}
            className="w-[400px] h-[300px]"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        {phase === "idle" && (
          <>
            <button
              onClick={handleAddInterview}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add Interview
            </button>
            <button
              onClick={startInterview}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Interview
            </button>
          </>
        )}

        {(phase === "calibrating" || phase === "interviewing") && (
          <button
            onClick={endInterview}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            End Interview
          </button>
        )}
      </div>

      {/* Small calibration instruction */}
      {phase === "calibrating" && (
        <p className="mt-4 text-gray-600">
          Align your face and look at the center of the screen...
        </p>
      )}
    </div>
  );
}
