import { inOrder } from "./inOrder";
import { contains } from "../testing/conditions/when/contains";
import { press } from "../testing/conditions/then/press";
import { AssertThen } from "..";
import { Call } from "../call/Call";

describe("ordered conditions", () => {
  let call: jest.Mocked<Call>;

  beforeEach(() => {
    call = {
      sendDtmfTone: jest.fn(),
      sendMedia: jest.fn(),
      getStream: jest.fn(),
      close: jest.fn(),
      isOpen: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    };
  });

  test("test passes if no conditions provided", () => {
    const orderedConditions = inOrder([]);

    const testOutcome = orderedConditions.test("Hello", call);

    expect(call.sendDtmfTone).not.toHaveBeenCalled();
    expect(testOutcome).toMatchObject({
      result: "pass",
    });
  });

  test("all match and test passes for last one", () => {
    const conditions: AssertThen[] = [
      {
        whenTranscript: contains("Hello"),
        then: press("1"),
      },
      {
        whenTranscript: contains("Jane"),
        then: press("2"),
      },
      {
        whenTranscript: contains("Austen"),
        then: press("3"),
      },
    ];

    const orderedConditions = inOrder(conditions);

    const testOutcome1 = orderedConditions.test("Hello", call);
    expect(call.sendDtmfTone).toHaveBeenCalled();
    expect(testOutcome1).toMatchObject({
      matchedCondition: conditions[0],
      result: "continue",
    });

    const testOutcome2 = orderedConditions.test("Jane", call);
    expect(call.sendDtmfTone).toHaveBeenCalled();
    expect(testOutcome2).toMatchObject({
      matchedCondition: conditions[1],
      result: "continue",
    });

    const testOutcome3 = orderedConditions.test("Austen", call);
    expect(call.sendDtmfTone).toHaveBeenCalled();
    expect(testOutcome3).toMatchObject({
      matchedCondition: conditions[2],
      result: "pass",
    });
  });

  test("test failed when second condition doesn't match", () => {
    const conditions: AssertThen[] = [
      {
        whenTranscript: contains("Hello"),
        then: press("1"),
      },
      {
        whenTranscript: contains("Jane"),
        then: press("2"),
      },
    ];

    const orderedConditions = inOrder(conditions);

    const testOutcome1 = orderedConditions.test("Hello", call);
    expect(call.sendDtmfTone).toHaveBeenCalled();
    expect(testOutcome1).toMatchObject({
      matchedCondition: conditions[0],
      result: "continue",
    });

    const testOutcome2 = orderedConditions.test("Darcy", call);
    expect(call.sendDtmfTone).toHaveBeenCalled();
    expect(testOutcome2).toMatchObject({
      result: "fail",
    });
  });
});
