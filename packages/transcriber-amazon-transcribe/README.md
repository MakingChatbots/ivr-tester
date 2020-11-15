# Amazon Transcribe

[![npm](https://img.shields.io/npm/v/ivr-tester-transcriber-amazon-transcribe)](https://www.npmjs.com/package/ivr-tester-transcriber-amazon-transcribe)

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
