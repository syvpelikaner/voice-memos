import { useSignalValue } from "react-alien-signals";

import { speechRecognitionManager } from "../../lib/speech-recognition";

export function Input() {
  const value = useSignalValue(speechRecognitionManager.$transcript);
  const isListening = useSignalValue(speechRecognitionManager.$isListening);
  return (
    <div>
      <textarea value={value} readOnly />
      {isListening && <p>Listening...</p>}
    </div>
  );
}
