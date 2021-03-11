const convertToDtmfArray = (dtmfSequence: string | string[]): string[] => {
  if (typeof dtmfSequence === "string") {
    return dtmfSequence.split("");
  }

  if (Array.isArray(dtmfSequence)) {
    const sequence: string[] = [];

    dtmfSequence
      .filter((d) => typeof d === "string")
      .forEach((e) => sequence.push(...e.split("")));

    return sequence;
  }

  return [];
};

test("abc", () => {
  expect(convertToDtmfArray("abc")).toStrictEqual(["a", "b", "c"]);
  expect(convertToDtmfArray("abc")).toStrictEqual(["a", "b", "c"]);
  expect(convertToDtmfArray(["a", "bc"])).toStrictEqual(["a", "b", "c"]);
  expect(convertToDtmfArray(["a", "b", "c"])).toStrictEqual(["a", "b", "c"]);
  expect(convertToDtmfArray("bc")).toStrictEqual(["b", "c"]);
  expect(convertToDtmfArray("")).toStrictEqual([]);
  expect(convertToDtmfArray([])).toStrictEqual([]);
});
