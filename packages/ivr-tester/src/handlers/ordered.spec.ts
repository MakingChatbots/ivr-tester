import { contains } from "../conditions/matchers";
import { press } from "../conditions/actions";
import { Call, ordered } from "./ordered";

describe("ordered conditions", () => {
  test("test passes if no conditions provided", () => {
    const dtmfGenerator: jest.Mocked<Call> = {
      sendDtmfTone: jest.fn(),
      sendMedia: jest.fn(),
    };
    const orderedConditions = ordered([]);

    const testOutcome = orderedConditions.test("Hello", dtmfGenerator);
    expect(dtmfGenerator.sendDtmfTone).not.toHaveBeenCalled();
    expect(testOutcome).toMatchObject({
      result: "pass",
    });
  });

  test("all match and test passes for last one", () => {
    const conditions = [
      {
        when: contains("Hello"),
        then: press("1"),
      },
      {
        when: contains("Jane"),
        then: press("2"),
      },
      {
        when: contains("Austen"),
        then: press("3"),
      },
    ];

    const call: jest.Mocked<Call> = {
      sendDtmfTone: jest.fn(),
      sendMedia: jest.fn(),
    };
    const orderedConditions = ordered(conditions);

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
    const conditions = [
      {
        when: contains("Hello"),
        then: press("1"),
      },
      {
        when: contains("Jane"),
        then: press("2"),
      },
    ];

    const call: jest.Mocked<Call> = {
      sendDtmfTone: jest.fn(),
      sendMedia: jest.fn(),
    };
    const orderedConditions = ordered(conditions);

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
