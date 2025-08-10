import { suite, test, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";

import { MemoForm } from "../memo-form";

suite("MemoForm", () => {
  beforeEach(() => {
    cleanup();
  });
  test("renders correctly", async () => {
    const expectedTitle = "Test Title";
    const expectedDescription = "Test Description";
    const expectedContent = "Test Content";
    render(
      <MemoForm
        title={expectedTitle}
        description={expectedDescription}
        content={expectedContent}
        onSubmit={() => {}}
        isListening={false}
      />
    );

    const titleInput = (await screen.findByLabelText(
      "Title"
    )) as HTMLInputElement;
    const descriptionInput = (await screen.findByLabelText(
      "Description"
    )) as HTMLInputElement;
    const contentInput = (await screen.findByLabelText(
      "Content"
    )) as HTMLInputElement;

    expect(titleInput.value).toBe(expectedTitle);
    expect(descriptionInput.value).toBe(expectedDescription);
    expect(contentInput.value).toBe(expectedContent);
  });

  test("calls onSubmit with form data", async () => {
    const handleSubmit = vi.fn();
    const expectedTitle = "Test Title";
    const expectedDescription = "Test Description";
    const expectedContent = "Test Content";
    render(
      <MemoForm
        title={expectedTitle}
        description={expectedDescription}
        content={expectedContent}
        onSubmit={handleSubmit}
        isListening={false}
      />
    );

    const submitButton = await screen.findByRole("button", { name: "Save" });

    await fireEvent.click(submitButton);

    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        title: expectedTitle,
        description: expectedDescription,
        content: expectedContent,
      },
      expect.anything()
    );
  });
});
