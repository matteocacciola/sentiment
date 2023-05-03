export const dot = (a: number[], b: number[]) => a.map((x, i) => a[i] * b[i])
  .reduce((m, n) => m + n);

export const distance = (a: number[], b: number[]): number => {
  const magnitudeA = Math.sqrt(dot(a, a));
  const magnitudeB = Math.sqrt(dot(b, b));
  return (magnitudeA && magnitudeB) ? dot(a, b) / (magnitudeA * magnitudeB) : 0;
};
