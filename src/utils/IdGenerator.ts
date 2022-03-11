export class IdGenerator {
  private static randomNumberFromInterval(min: number, max: number): string {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }
  static generateId(): string {
    return (
      'ID_' +
      Date.now().toString(36).slice(0, 4) +
      IdGenerator.randomNumberFromInterval(0, 10000000).slice(0, 4) +
      Date.now().toString(36).slice(0, 4) +
      IdGenerator.randomNumberFromInterval(0, 10000000).slice(0, 5)
    );
  }
}
