export const ShuffleArray = <T>(arr: T[]) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};
