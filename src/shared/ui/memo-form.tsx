import { NotebookPen } from "lucide-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface MemoInputs {
  title: string;
  description: string;
  content: string;
}

export interface MemoProps {
  description: string;
  title: string;
  content: string;
  isListening: boolean;
  onSubmit: SubmitHandler<MemoInputs>;
}

export const MemoForm = ({
  description,
  title,
  content,
  isListening,
  onSubmit,
}: MemoProps) => {
  const { register, handleSubmit } = useForm<MemoInputs>({
    values: {
      description,
      title,
      content,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          <NotebookPen /> Memo
        </legend>
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="input w-full"
          type="text"
          {...register("title")}
        />
        <label className="label" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          className="input w-full"
          type="text"
          {...register("description")}
        />
        <label className="label" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          className="textarea w-full min-h-72"
          readOnly={isListening}
          {...register("content")}
        ></textarea>
      </fieldset>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={content.length === 0}
      >
        Save
      </button>
    </form>
  );
};
