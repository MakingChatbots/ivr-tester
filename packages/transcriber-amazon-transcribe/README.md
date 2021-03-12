# Amazon Transcribe

[![npm](https://img.shields.io/npm/v/ivr-tester-transcriber-amazon-transcribe)](https://www.npmjs.com/package/ivr-tester-transcriber-amazon-transcribe)

A plugin for [IVR Tester](https://github.com/SketchingDev/ivr-tester) to transcribe IVR call flows using
[AWS Transcribe](https://aws.amazon.com/transcribe/).

## Installation

Install using yarn:

```shell
yarn add ivr-tester-transcriber-amazon-transcribe
```

Or npm:

```shell
npm install ivr-tester-transcriber-amazon-transcribe
```

## Configuration

1. [Create an AWS Account](https://docs.aws.amazon.com/transcribe/latest/dg/setting-up-asc.html)
2. Store AWS keys in environment variables:

```shell
export AWS_ACCESS_KEY_ID=<Your access key ID>
export AWS_SECRET_ACCESS_KEY=<Your secret access key>
```

### Usage

See the [API's documentation](./doc/modules/_index_.md) for details of each parameter.

```typescript
import { amazonTranscribe } from "ivr-tester-transcriber-amazon-transcribe";

const config: Config = {
  transcriber: amazonTranscribe("us-east-1", "en-GB"),
};
```

### Training a custom language model

[You can train a model with domain specific terminology](https://docs.aws.amazon.com/transcribe/latest/dg/custom-language-models.html)
to improve accuracy. As of writing this it is only available for US English (en-US).

Interesting blog article on the subject: [Building custom language models to supercharge speech-to-text performance for Amazon Transcribe](https://aws.amazon.com/blogs/machine-learning/building-custom-language-models-to-supercharge-speech-to-text-performance-for-amazon-transcribe/)

## Testing

Integration tests exist to assert it integrates properly with the real Amazon Transcribe service. This means it costs
money so hasn't been added to the project's CI/CD pipeline.

To run locally:

```shell
export AWS_ACCESS_KEY_ID=<Your access key ID>
export AWS_SECRET_ACCESS_KEY=<Your secret access key>

yarn test:integration
```

## Useful links

* [Amazon Transcribe streaming transcription documentation](https://docs.aws.amazon.com/transcribe/latest/dg/streaming.html)
* [Example application using Twilio Media Streams and Amazon Transcribe](https://github.com/TwilioDevEd/talkin-cedric-node)
