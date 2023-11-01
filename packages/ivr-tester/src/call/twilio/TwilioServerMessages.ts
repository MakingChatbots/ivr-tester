/**
 * Events for messages sent from the server
 */
export enum TwilioServerMessageEventTypes {
  Start = 'start',
  Media = 'media',
  Mark = 'mark',
  Stop = 'stop',
}

/**
 * This message type encapsulates the raw audio data.
 *
 * @see https://www.twilio.com/docs/voice/twiml/stream#message-media
 */
export interface ServerMediaMessage {
  event: TwilioServerMessageEventTypes.Media;

  /**
   * Number used to keep track of message sending order. First message starts
   * with "1" and then is incremented for each message.
   */
  sequenceNumber: string;

  /**
   * The unique identifier of the Stream
   */
  streamSid: string;

  /**
   * An object containing media metadata and payload
   */
  media: {
    track: 'inbound' | 'outbound';
    /**
     * The chunk for the message. The first message will begin with "1" and increment with each subsequent message.
     */
    chunk: string;
    /**
     * Presentation Timestamp in Milliseconds from the start of the stream.
     */
    timestamp: string;
    /**
     * Raw audio in encoded in base64
     */
    payload: string;
  };
}

/**
 * This message contains important metadata about the stream and is sent immediately after the Connected message.
 * It is only sent once at the start of the Stream.
 *
 * @see https://www.twilio.com/docs/voice/twiml/stream#message-start
 */
export interface ServerStartMessage {
  event: TwilioServerMessageEventTypes.Start;

  /**
   * Number used to keep track of message sending order. First message starts with "1" and then is incremented.
   */
  sequenceNumber: string;

  /**
   * The unique identifier of the Stream
   */
  streamSid: string;

  /**
   * An object containing Stream metadata
   */
  start: {
    /**
     * The unique identifier of the Stream
     */
    streamSid: string;
    /**
     * The Account identifier that created the Stream
     */
    accountSid: string;
    /**
     * The Call identifier from where the Stream was started.
     */
    callSid: string;
    /**
     * An array of values that indicates what media flows to expect in subsequent messages. Values include inbound, outbound.
     */
    tracks: ('inbound' | 'outbound')[];
    /**
     * An object that represents the Custom Parameters that where set when defining the Stream
     * @see https://www.twilio.com/docs/voice/twiml/stream#custom-parameters
     */
    customParameters: { [key: string]: string };
    /**
     * An object containing the format of the payload in the Media Messages.
     */
    mediaFormat: {
      /**
       * The encoding of the data in the upcoming payload. Value will always be audio/x-mulaw.
       */
      encoding: 'audio/x-mulaw';
      /**
       * The Sample Rate in Hertz of the upcoming audio data. Value is always 8000
       */
      sampleRate: 8000;
      /**
       * The number of channels in the input audio data. Value will always be 1
       */
      channels: 1;
    };
  };
}

/**
 * The mark event is sent only during bi-directional streaming by using the <Connect> verb.
 * It is used to track, or label, when media has completed.
 *
 * @see https://www.twilio.com/docs/voice/twiml/stream#message-mark
 */
export interface ServerMarkMessage {
  event: TwilioServerMessageEventTypes.Mark;

  /**
   * Number used to keep track of message sending order. First message starts with "1" and then is incremented for each message.
   */
  sequenceNumber: string;

  /**
   * An object containing the mark metadata
   */
  mark: {
    /**
     * The value specified when creating the mark message to Twilio
     */
    name: string;
  };
}

/**
 * A stop message will be sent when the Stream is either <Stop>ped or the Call has ended.
 * @see https://www.twilio.com/docs/voice/twiml/stream#message-stop
 */
export interface ServerStopMessage {
  event: TwilioServerMessageEventTypes.Stop;

  /**
   * Number used to keep track of message sending order. First message starts with "1" and then is incremented for each message.
   */
  sequenceNumber: string;

  /**
   * The unique identifier of the Stream
   */
  streamSid: string;

  /**
   * An object containing Stream metadata
   */
  stop: {
    /**
     * The Account identifier that created the Stream
     */
    accountSid: string;

    /**
     * The Call identifier that started the Stream
     */
    callSid: string;
  };
}

/**
 * Media Stream events from Twilio
 * @see https://www.twilio.com/docs/voice/twiml/stream#websocket-messages-from-twilio
 */
export type TwilioServerMessages =
  | ServerMediaMessage
  | ServerStartMessage
  | ServerMarkMessage
  | ServerStopMessage;
