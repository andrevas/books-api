export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce((total, sum) => total + sum, 0);
  return sum / numbers.length;
}
