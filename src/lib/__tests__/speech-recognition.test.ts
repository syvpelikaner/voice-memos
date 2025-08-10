import {
  expect,
  test,
  suite,
  beforeAll,
  afterAll,
  vi,
  beforeEach,
} from "vitest";
//@ts-expect-error
import { SpeechRecognition } from "corti";
import { SpeechRecognitionManager } from "../speech-recognition";

beforeAll(() => {
  vi.stubGlobal("SpeechRecognition", SpeechRecognition);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

suite("SpeechRecognitionManager", () => {
  let recognition: SpeechRecognition;

  beforeEach(() => {
    recognition = new SpeechRecognition();
  });

  test("startListening", () => {
    const manager = new SpeechRecognitionManager();
    manager.start();
    expect(manager.$isListening()).toBe(true);
  });

  test("stopListening", () => {
    const manager = new SpeechRecognitionManager();
    manager.start();
    manager.stop();
    expect(manager.$isListening()).toBe(false);
  });

  test("speech recognition", () => {
    const manager = new SpeechRecognitionManager({}, recognition);
    manager.start();
    recognition.say(["Hey there how are you?"]);

    expect(manager.$transcript()).toBe("Hey there how are you?");
  });
});
