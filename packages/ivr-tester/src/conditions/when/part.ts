import { When } from "./When";

export const part = (when: When): When => (transcript: string) => {
  const words = transcript.split(" ");
  const totalWords = words.length;

  for (let start = 0; start <= totalWords; start++) {
    for (let end = start; end < totalWords; end++) {
      const sliceOfSentence = words.slice(start, end + 1).join(" ");
      if (when(sliceOfSentence)) {
        return true;
      }
    }
  }

  return false;
};
