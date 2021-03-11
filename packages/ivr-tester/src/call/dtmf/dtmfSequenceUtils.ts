const validDtmfDigits: ReadonlyArray<string> = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "*",
  "#",
  "w",
];

export function convertToDtmfArray(dtmfSequence: string | string[]): string[] {
  if (typeof dtmfSequence === "string") {
    return dtmfSequence.split("").map((c) => c.toLocaleLowerCase());
  }

  if (Array.isArray(dtmfSequence)) {
    const sequence: string[] = [];

    dtmfSequence
      .filter((d) => typeof d === "string")
      .forEach((e) => sequence.push(...e.split("")));

    return sequence.map((c) => c.toLocaleLowerCase());
  }

  return [];
}

const isArrayOfString = (x: unknown[]): x is string[] =>
  Array.isArray(x) && x.every((e) => typeof e === "string");

export function dtmfSequenceValidator(
  possibleDtmfSequence: string | string[]
): { valid: true } | { valid: false; reason: string } {
  if (
    typeof possibleDtmfSequence !== "string" &&
    !isArrayOfString(possibleDtmfSequence)
  ) {
    return {
      valid: false,
      reason: `DTMF sequence '${possibleDtmfSequence}' must be a string or array of strings`,
    };
  }

  const dtmfSequence = convertToDtmfArray(possibleDtmfSequence);
  if (dtmfSequence.length === 0) {
    return { valid: false, reason: "At least one digit must be provided" };
  }

  const invalidDigits = dtmfSequence.filter(
    (c) => !validDtmfDigits.includes(c.toLocaleLowerCase())
  );
  if (invalidDigits.length > 0) {
    return {
      valid: false,
      reason: `DTMF sequence '${possibleDtmfSequence}' contains invalid digits '${invalidDigits}'. The valid digits are '${validDtmfDigits}'`,
    };
  }

  return { valid: true };
}
