import { curseWords } from '../constants/curserWords';

export const checkCurse = (message: string) => {
  let isIncludingCurse = false;

  for (let curseWord of curseWords) {
    if (message.includes(curseWord)) {
      isIncludingCurse = true;
      break;
    }
  }

  return isIncludingCurse;
};
