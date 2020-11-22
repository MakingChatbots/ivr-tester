# Amazon Transcribe

[![npm](https://img.shields.io/npm/v/ivr-tester-transcriber-amazon-transcribe)](https://www.npmjs.com/package/ivr-tester-transcriber-amazon-transcribe)

> Transcriber plugin for using Amazon Transcribe to transcribe phone-calls.

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

Ensure AWS credentials are defined in environment variables:

```shell
export AWS_ACCESS_KEY_ID=<Your access key ID>
export AWS_SECRET_ACCESS_KEY=<Your secret access key>
```

### Usage

See the [API documentation](./docs/api.md) for details of each parameter.

```typescript
import { amazonTranscribe } from "ivr-tester-transcriber-amazon-transcribe";

const config: Config = {
  transcriber: amazonTranscribe("us-east-1", "en-GB"),
};
```

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
