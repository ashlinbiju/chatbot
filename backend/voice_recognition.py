import speech_recognition as sr
import sounddevice as sd
import numpy as np

def record_audio(duration=5, fs=44100):
    """
    Record audio for a specific duration using sounddevice.
    """
    print("Recording...")
    audio_data = sd.rec(int(duration * fs), samplerate=fs, channels=2, dtype='int16')
    sd.wait()
    return audio_data

def audio_to_text(audio_data, fs=44100):
    """
    Convert recorded audio to text using speech_recognition
    """
    recognizer = sr.Recognizer()
    audio = sr.AudioData(audio_data.tobytes(), fs, 2)

    try:
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return "Sorry, I couldn't understand that."
    except sr.RequestError:
        return "Could not request results from Google Speech Recognition service."
