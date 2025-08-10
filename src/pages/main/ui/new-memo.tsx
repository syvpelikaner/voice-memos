import { nanoid } from "nanoid";

import { useCreateMemo } from "../state/memos";
import { useSpeechRecognition } from "../../../shared/state/recognition";
import { MemoForm, type MemoInputs } from "../../../shared/ui/memo-form";
import { useCallback } from "react";

export const NewMemo = () => {
  const { isListening, transcript, resetRecognition } = useSpeechRecognition();
  const { mutate: createMemo } = useCreateMemo();

  const handleSubmit = useCallback(
    ({ title, description, content }: MemoInputs) => {
      if (content.trim() !== "") {
        const currentTime = new Date();
        createMemo(
          {
            id: nanoid(),
            title,
            description,
            content,
            tags: [],
            createdAt: currentTime,
            updatedAt: currentTime,
          },
          {
            onSuccess: () => {
              resetRecognition();
            },
            onError: (error) => {
              console.error("Error saving memo:", error);
            },
          }
        );
      }
    },
    []
  );

  if (!isListening && transcript.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center">
      <div className="card card-sm bg-base-100/30 card-border border-base-300 backdrop-blur-md w-full max-w-lg">
        <div className="card-body">
          <MemoForm
            title=""
            description=""
            content={transcript}
            isListening={isListening}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
