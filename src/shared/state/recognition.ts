import { useCallback } from "react";
import { useSignalValue } from "react-alien-signals";

import { speechRecognitionManager } from "../../lib/speech-recognition";

export const useSpeechRecognition = () => {
  const isListening = useSignalValue(speechRecognitionManager.$isListening);
  const transcript = useSignalValue(speechRecognitionManager.$transcript);
  const error = useSignalValue(speechRecognitionManager.$error);
  const toggleListening = useCallback(() => {
    if (isListening) {
      speechRecognitionManager.stop();
    } else {
      speechRecognitionManager.start();
    }
  }, [isListening]);
  const resetRecognition = useCallback(() => {
    speechRecognitionManager.reset();
  }, []);

  return {
    transcript,
    error,
    toggleListening,
    resetRecognition,
    isListening,
  };
};
