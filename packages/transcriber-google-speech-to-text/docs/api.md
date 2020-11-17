<a name="googleSpeechToText"></a>

## googleSpeechToText([options], [speechClient]) ⇒ <code>object</code>
Factory for creating a Google Speech-to-Text transcriber plugin that is preconfigured for
phone-calls - specifically 8-bit PCM mono uLaw with a sampling rate of 8Khz.

**Kind**: global function  
**Returns**: <code>object</code> - Factory for creating Google Speech-to-Text plugin  
**See**: [Google Speech-to-Text's config documentation](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | The configuration object. See the subsequent   parameters for more details. |
| options.languageCode | <code>string</code> |  | Language of the supplied audio as a BCP-47 language tag.        Defaults to "en-US". See [Language Support](https://cloud.google.com/speech-to-text/docs/languages) for        a list of the currently supported language codes. |
| [options.speechPhrases] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | A list of strings containing words and phrases "hints" so that the speech        recognition is more likely to recognize them. This can be used to improve the accuracy for specific words and        phrases. |
| [options.useEnhanced] | <code>boolean</code> | <code>false</code> | Set to true to use an enhanced model for speech recognition if it available        for the language code provided. Be aware that        [enhanced models](https://cloud.google.com/speech-to-text/docs/enhanced-models) are more expensive. |
| [speechClient] | <code>SpeechClient</code> | <code>SpeechClient</code> | [SpeechClient](https://googleapis.dev/nodejs/speech/latest/v1.SpeechClient.html) service that implements Google Cloud Speech API |

