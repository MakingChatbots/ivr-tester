export interface IvrNumber {
  /**
   * Phone number that you've rented in Twilio from which the call will be made
   */
  from: string;

  /**
   * Phone number of the IVR call flow to test
   */
  to: string;
}
