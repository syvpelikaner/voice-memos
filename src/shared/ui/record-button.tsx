import { Mic } from "lucide-react";
import { clsx } from "clsx";

import { useSpeechRecognition } from "../state/recognition";

export const RecordButton = () => {
  const { isListening, toggleListening } = useSpeechRecognition();

  return (
    <div className="absolute right-8 bottom-8 z-50">
      <div className="relative flex">
        <span
          className={clsx(
            "absolute inline-flex h-full w-full rounded-full bg-primary opacity-75",
            {
              "animate-ping": isListening,
            }
          )}
        />
        <button
          className={"relative inline-flex btn btn-primary btn-circle btn-xl"}
          onClick={toggleListening}
        >
          <Mic />
        </button>
      </div>
    </div>
  );
};
