const createRandomFloat = (
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
) => {
  return Math.round(Math.random() * (max - min) + min);
};

const createArray = (count = 20): number[] => {
  return Array.from({ length: count }).map((element) =>
    createRandomFloat(-count, +count)
  );
};

export default createArray;
