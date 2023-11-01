/**
 * Events for messages sent from the client
 */
export enum TwilioClientMessageEventTypes {
  Media = 'media',
  Mark = 'mark',
}

/**
 * To send media back to Twilio, you must provide a similarly formattedmedia message. The payload must be encoded
 * audio/x-mulaw with a sample rate of 8000 and base64 encoded. The audio can be of any size.
 *
 * The media messages will be buffered and played in the order received. If you'd like interrupt the buffered audio,
 * see the clear event message.
 *
 * The media payload should not contain audio file type header bytes. Providing header bytes will cause the media
 * to be streamed incorrectly.
 *
 * @see https://www.twilio.com/docs/voice/twiml/stream#message-media-to-twilio
 */
export interface ClientMediaMessage {
  event: TwilioClientMessageEventTypes.Media;

  /**
   * The SID of the Stream that should play back the audio
   */
  streamSid: string;

  /**
   * An object containing media metadata and payload
   */
  media: {
    /**
     * Raw mulaw/8000 audio in encoded in base64
     */
    payload: string;
  };
}

/**
 * Send a mark event message after sending a media event message to be notified when the audio that you have sent
 * has been completed. You'll receive a mark event with a matching name from Twilio when the audio ends (or if there is
 * no audio buffered).
 *
 * You will also receive an incoming mark event message if the buffer was cleared using the clear event message.
 *
 * @see https://www.twilio.com/docs/voice/twiml/stream#message-mark-to-twilio
 */
export interface ClientMarkMessage {
  event: TwilioClientMessageEventTypes.Mark;

  /**
   * The SID of the Stream that should receive the mark
   */
  streamSid: string;

  /**
   * An object containing mark metadata and payload
   */
  mark: {
    /**
     * A name specific to your needs that will assist in recognizing future received mark event
     */
    name: string;
  };
}
