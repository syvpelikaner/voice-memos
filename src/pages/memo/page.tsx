import { useCallback } from "react";
import { useSpeechRecognition } from "../../shared/state/recognition";
import { MemoForm, type MemoInputs } from "../../shared/ui/memo-form";
import { RecordButton } from "../../shared/ui/record-button";
import { useUpdateMemo, useVoiceMemo } from "./state/memo";

export const MemoPage = () => {
  const { data } = useVoiceMemo();
  const { mutate: updateMemo } = useUpdateMemo();
  const { isListening, transcript, resetRecognition } = useSpeechRecognition();

  const handleUpdate = useCallback(
    ({ title, description, content }: MemoInputs) => {
      if (content.trim() !== "" && data !== undefined) {
        const currentTime = new Date();
        updateMemo(
          {
            id: data.id,
            title,
            description,
            content,
            updatedAt: currentTime,
          },
          {
            onSuccess: () => {
              console.log("Memo updated successfully");
              resetRecognition();
            },
            onError: (error) => {
              console.error("Error saving memo:", error);
            },
          }
        );
      }
    },
    [data, updateMemo, resetRecognition]
  );

  return (
    <>
      {data !== undefined && (
        <MemoForm
          description={data.description}
          title={data.title}
          content={transcript.length > 0 ? transcript : data.content}
          onSubmit={handleUpdate}
          isListening={isListening}
        />
      )}
      <RecordButton />
    </>
  );
};
