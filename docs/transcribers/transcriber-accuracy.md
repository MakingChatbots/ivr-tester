# Improving Transcriber Accuracy

Writing scenarios that reflect your IVR flows is useful for both documentation and asserting their behaviour. Ideally
you should be able to refer to your scenarios when you want to understand the behaviour of your IVR flow.

However, being able to document your flow accurately in a scenario file relies on the accuracy of the transcription of
the call.

A poor quality transcription can turn the prompts:

```
Welcome to Fictional Enterprise. Please enter your account number followed by hash

Press 1 to hear your balance or 2 for customer services

Your balance is 2 pounds and 1 pence
```

into the illegible:

```
welcome to fit enter pies please enter you account number follows by dash

press 1 to hear your ballet or 2 for consumer services

your ballet is 2 pounds and 1 pence
```

*This example has been exaggerated for illustrative purposes. They're never usually this bad.*

There are two ways to deal with poor quality transcriptions, both can be used in conjunction. The first and preferred
approach is to train your transcription to be more accurate, and the second is to reduce the strictness of what you
expect to hear from each prompt.

Let's start with reducing the strictness, as it's the quickest:

## Reducing the strictness of your tests

As we've said, this method is a quick way to reduce the expectations your instructions have on a prompt, but comes
with downsides:

* It isn't easy to understand what the flow is asking nor expecting by looking at your test definition
* You're less likely to pick up changes to your flow

Using the following methods you can create a very lenient flow:

* `similarTo(<question text>,<similarity thresold>)` with similarity threshold so low that it misses genuine errors
* `isAnything()` to ignore what is being said in a prompt all-together
* `contains(...)` to check for the presence of word(s) in the prompt

Resulting in a very forgiving but hard to follow call flow:

```typescript
const balanceTest = {
  name: "Customer can ask to hear their balance",
  instructions: inOrder([
    {
      whenPrompt: similarTo(
        "please enter your account number followed by hash",
        0.3 // Similarity threshold (0 to 1)
      ),
      then: press("864586#"),
      silenceAfterPrompt: 3000,
      timeout: 6000,
    },
    {
      whenPrompt: isAnything(),
      then: press("2"),
      silenceAfterPrompt: 3000,
      timeout: 6000,
    },
    {
      whenPrompt: contains(["pounds", "pence"]),
      then: doNothing(),
      silenceAfterPrompt: 3000,
      timeout: 6000,
    },
  ]),
};
```

## Training your transcriber

Improving the accuracy of your transcript service is the ideal starting point as you can then make your instructions
more descriptive of what customers would hear (forming documentation of your flow) and allows you to catch changes to
the wording that could negatively impact customers.

Each transcription service is trained differently, but usually involves providing it with a list of words/phrases that
it cleverly learns to recognise in the audio stream.

IVR Tester currently supports AWS Transcribe and Google Speech-to-Text (refer to their READMEs on how to train them),
but we'll focus on Google Speech-to-Text as its so simple to train...

```typescript
const config = {
  transcriber: googleSpeechToText({
    languageCode: "en-GB",
    speechPhrases: [
      "Fictional Enterprise",
      "account number",
      "followed by hash",
      "balance",
      "customer services",
      "balance",
      "pounds",
      "pence"
    ],
    useEnhanced: true
  }),
  recording: {
    transcript: {
      outputPath: path.join(__dirname, "../recordings")
    }
  }
};
```

That's it, I told you it was easy. When defining Google Speech-to-Text in our test's configuration we simply give it
the phrases that it found most problematic, and at a little extra cost I told it to use its 'enhanced model'
(limited to certain languages).

```typescript
const balanceTest = {
  name: "Customer can ask to hear their balance",
  instructions: inOrder([
    {
      whenPrompt: similarTo("please enter your account number followed by hash"),
      then: press("864586#"),
      silenceAfterPrompt: 3000,
      timeout: 6000
    },
    {
      whenPrompt: similarTo("press 1 to hear your balance or 2 for customer services"),
      then: press("2"),
      silenceAfterPrompt: 3000,
      timeout: 6000
    },
    {
      whenPrompt: matches(/your balance is [0-9]+ pounds and [0-9]+ pence/),
      then: hangUp(),
      silenceAfterPrompt: 3000,
      timeout: 6000
    }
  ])
};
```

# Measuring the accuracy

Calculating the accuracy of the transcription services before and after training is done using the Word Error Rate (WER).

To calculate the WER:

1. Install the [speech-recognition-evaluation](https://github.com/symblai/speech-recognition-evaluation#installation)
   tool.
    ```shell
    npm install -g speech-recognition-evaluation
    ```

2. Store the transcription reference (know as the ground truth) to a file
    ```text
    Welcome to Fictional Enterprise. Please enter your account number followed by hash

    Press 1 to hear your balance or 2 for customer services

    Your balance is 2 pounds and 1 pence
    ```

3. Run the untrained test with the and tell it to record the transcription:
    ```typescript
    const config = {
      transcriber: googleSpeechToText({ languageCode: "en-GB" }),
      recording: {
        transcript: {
          outputPath: path.join(__dirname, "../recordings"),
          includeResponse: false // We don't care about what our instructions responded with
        }
      }
    };
    ```

    Resulting in the file:
    ```text
    welcome to fit enter pies please enter you account number follows by dash

    press 1 to hear your ballet or 2 for consumer services

    your ballet is 2 pounds and 1 pence
    ```

4. Calculate the WER
   ```shell
   asr-eval -e -o original.txt -g google-transcription-without-training.txt

   Word Error Rate (WER): 29.03225806451613%
   ```

5. Run the test using our trained model and record the transcript
    ```typescript
    const config = {
      transcriber: googleSpeechToText({
        languageCode: "en-GB",
        speechPhrases: [
          "fictional enterprise",
          "account number",
          "followed by hash",
          "balance",
          "customer services",
          "balance",
          "pounds",
          "pence"
        ],
        useEnhanced: true
      }),
      recording: {
        transcript: {
          outputPath: path.join(__dirname, "../recordings"),
          includeResponse: false
        }
      }
    };
    ```

    ```text
    welcome two fictional enterprise please enter your account number followed by hash

    press 1 to hear your balance or 2 for customer services

    your balance is 2 pounds and 1 pence
    ```

6. Calculate the WER
   ```shell
   asr-eval -e -o original.txt -g google-transcription-with-training.txt
   Word Error Rate (WER): 3.225806451612903%
   ```

Albeit highly contrived, the example shows how training your transcription model has improved the Word Error Rate
by 25.80%
