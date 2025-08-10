import { signal } from "alien-signals";

export interface SpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}

export class SpeechRecognitionManager {
  private recognition: SpeechRecognition | null = null;

  $isListening = signal(false);
  $transcript = signal("");
  $error = signal<string | null>(null);

  constructor(
    {
      continuous = true,
      interimResults = true,
      lang = "en-US",
    }: SpeechRecognitionOptions = {},
    recognition?: SpeechRecognition
  ) {
    if (
      !(
        "SpeechRecognition" in globalThis ||
        "webkitSpeechRecognition" in globalThis
      ) &&
      recognition === undefined
    ) {
      throw new Error("Speech recognition not supported");
    }

    this.recognition =
      recognition ??
      new (globalThis.SpeechRecognition ??
        globalThis.webkitSpeechRecognition)();
    this.recognition.continuous = continuous;
    this.recognition.interimResults = interimResults;
    this.recognition.lang = lang;
    this.bindEvents();
  }

  private bindEvents() {
    if (!this.recognition) return;

    this.recognition.addEventListener("start", () => {
      this.$isListening(true);
      this.$transcript("");
      this.$error(null);
    });

    this.recognition.addEventListener(
      "result",
      (event: SpeechRecognitionEvent) => {
        console.log("Speech recognition result", event);
        const transcript = getTranscript(event);
        this.$transcript(transcript);
        this.$error(null);
      }
    );

    this.recognition.addEventListener("end", (event) => {
      console.log("Speech recognition ended", event);
      this.$isListening(false);
    });

    this.recognition.addEventListener(
      "error",
      (event: SpeechRecognitionErrorEvent) => {
        this.$error(event.error);
      }
    );
  }

  start() {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  reset() {
    this.stop();
    this.$isListening(false);
    this.$transcript("");
    this.$error(null);
  }
}

function getTranscript(event: SpeechRecognitionEvent): string {
  return Array.from(event.results)
    .map((result) => result[0].transcript)
    .join("")
    .trim();
}
