export class Helper {
  static isTruthy(x: any): boolean {
    return x !== null && x !== undefined;
  }

  static isNullOrUndefined(x: any): boolean {
    return x === null || x === undefined;
  }
}
