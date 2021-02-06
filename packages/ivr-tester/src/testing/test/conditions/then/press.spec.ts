import { Call } from "../../../../call/Call";
import { press } from "./press";

describe("press", () => {
  let call: jest.Mocked<Call>;

  beforeEach(() => {
    call = {
      emit: jest.fn(),
      off: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
      getStream: jest.fn(),
      isOpen: jest.fn(),
      sendDtmfTone: jest.fn(),
      sendMedia: jest.fn(),
    };
  });

  test("each key separated by a pause", () => {
    press("123").do(call);
    expect(call.sendDtmfTone).toBeCalledWith("1w2w3");
  });

  test("pause not inserted if one already present", () => {
    press("1w23").do(call);
    expect(call.sendDtmfTone).toBeCalledWith("1w2w3");
  });

  test("pause not inserted if multiple already present", () => {
    press("1ww23").do(call);
    expect(call.sendDtmfTone).toBeCalledWith("1ww2w3");
  });

  test("pauses not inserted if disabled in config", () => {
    press("123", { disableAutomaticSlowdown: true }).do(call);
    expect(call.sendDtmfTone).toBeCalledWith("123");
  });
});
