[Google Speech-to-Text Transcriber](../README.md) / GoogleSpeechToTextOptions

# Interface: GoogleSpeechToTextOptions

Options used when starting a transcription stream to Google's Speech-to-Text service. See [Google's documentation
for more detailed info](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig)

## Table of contents

### Properties

- [languageCode](googlespeechtotextoptions.md#languagecode)
- [speechPhrases](googlespeechtotextoptions.md#speechphrases)
- [useEnhanced](googlespeechtotextoptions.md#useenhanced)

## Properties

### languageCode

• `Optional` **languageCode**: *string*

Language of the supplied audio as a BCP-47 language tag.

See [Language Support](https://cloud.google.com/speech-to-text/docs/languages) for a list of the
currently supported language codes.

Defined in: [index.ts:16](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/transcriber-google-speech-to-text/src/index.ts#L16)

___

### speechPhrases

• `Optional` **speechPhrases**: *string*[]

A list of strings containing words and phrases "hints" so that the speech recognition is more likely to recognize
them. This can be used to improve the accuracy for specific words and phrases.

Defined in: [index.ts:22](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/transcriber-google-speech-to-text/src/index.ts#L22)

___

### useEnhanced

• `Optional` **useEnhanced**: *boolean*

Whether to use an enhanced model for speech recognition if it is available for the language code provided.

Be aware that [enhanced models cost more](https://cloud.google.com/speech-to-text/docs/enhanced-models).

Defined in: [index.ts:29](https://github.com/SketchingDev/ivr-tester/blob/f78871d/packages/transcriber-google-speech-to-text/src/index.ts#L29)
