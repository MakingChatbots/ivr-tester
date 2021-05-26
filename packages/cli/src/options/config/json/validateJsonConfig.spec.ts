import { JsonConfig } from "./JsonConfig";
import { validateConfig } from "./validateJsonConfig";

const validConfig: JsonConfig = {
  transcriber: {
    name: "test",
    options: {},
  },
  recording: {
    audio: {
      filename: "/test-filename",
      outputPath: "/test/path",
    },
    transcript: {
      filename: "/test-filename",
      outputPath: "/test/path",
      includeResponse: false,
    },
  },
};

test("Return JSON recording config if no errors", () => {
  const validationResult = validateConfig(validConfig);

  expect(validationResult.error).not.toBeDefined();
  expect(validationResult.config).toMatchObject(validConfig);
});

test("Return errors if invalid", () => {
  const invalidConfig = {
    recording: {
      audio: {
        filename: 123,
        outputPath: "/test/path",
      },
      transcript: {
        outputPath: "/test/path",
      },
    },
  };

  const validationResult = validateConfig(invalidConfig);

  expect(validationResult.error).toBeDefined();
  expect(validationResult.config).not.toBeDefined();
});

test("Return JSON with default localServerPort", () => {
  const validationResult = validateConfig(validConfig);

  expect(validationResult.error).not.toBeDefined();
  expect(validationResult.config).toMatchObject({ localServerPort: 8080 });
});
