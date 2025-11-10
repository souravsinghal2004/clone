from flask import Flask, request, jsonify
from resemblyzer import VoiceEncoder, preprocess_wav
from pathlib import Path
import numpy as np
import tempfile
import torch

app = Flask(__name__)
encoder = VoiceEncoder()  # pre-trained model
reference_embed = None  # store the user's voice embedding

@app.route("/register-voice", methods=["POST"])
def register_voice():
    global reference_embed
    file = request.files["audio"]
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    file.save(tmp.name)

    wav = preprocess_wav(tmp.name)
    reference_embed = encoder.embed_utterance(wav)
    print("✅ Registered voice sample saved and embedded.")
    return jsonify({"message": "Voice registered successfully"}), 200

@app.route("/check-voice", methods=["POST"])
def check_voice():
    global reference_embed
    if reference_embed is None:
        return jsonify({"error": "No registered voice"}), 400

    file = request.files["audio"]
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    file.save(tmp.name)

    wav = preprocess_wav(tmp.name)
    embed = encoder.embed_utterance(wav)

    similarity = np.dot(reference_embed, embed) / (np.linalg.norm(reference_embed) * np.linalg.norm(embed))
    print(f"🎧 Cosine similarity: {similarity:.3f}")

    if similarity < 0.75:
        result = "different"
    else:
        result = "same"

    print(f"🎧 Received audio chunk → Detected: {result.upper()}")
    return jsonify({"result": result}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
