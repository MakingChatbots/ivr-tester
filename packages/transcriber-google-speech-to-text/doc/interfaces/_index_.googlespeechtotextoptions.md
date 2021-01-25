**[Google Speech-to-Text Transcriber](../README.md)**

> [Globals](../README.md) / ["index"](../modules/_index_.md) / GoogleSpeechToTextOptions

# Interface: GoogleSpeechToTextOptions

Options used when starting a transcription stream to Google's Speech-to-Text service. See [Google's documentation
for more detailed info](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig)

## Hierarchy

* **GoogleSpeechToTextOptions**

## Index

### Properties

* [languageCode](_index_.googlespeechtotextoptions.md#languagecode)
* [speechPhrases](_index_.googlespeechtotextoptions.md#speechphrases)
* [useEnhanced](_index_.googlespeechtotextoptions.md#useenhanced)

## Properties

### languageCode

• `Optional` **languageCode**: string

*Defined in [transcriber-google-speech-to-text/src/index.ts:16](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/transcriber-google-speech-to-text/src/index.ts#L16)*

Language of the supplied audio as a BCP-47 language tag.

See [Language Support](https://cloud.google.com/speech-to-text/docs/languages) for a list of the
currently supported language codes.

___

### speechPhrases

• `Optional` **speechPhrases**: string[]

*Defined in [transcriber-google-speech-to-text/src/index.ts:22](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/transcriber-google-speech-to-text/src/index.ts#L22)*

A list of strings containing words and phrases "hints" so that the speech recognition is more likely to recognize
them. This can be used to improve the accuracy for specific words and phrases.

___

### useEnhanced

• `Optional` **useEnhanced**: boolean

*Defined in [transcriber-google-speech-to-text/src/index.ts:29](https://github.com/SketchingDev/ivr-tester/blob/c5ffee0/packages/transcriber-google-speech-to-text/src/index.ts#L29)*

Whether to use an enhanced model for speech recognition if it is available for the language code provided.

Be aware that [enhanced models cost more](https://cloud.google.com/speech-to-text/docs/enhanced-models).
