import * as R from "ramda";

export const getPrice = (price: number): string =>
  numberWithCommas(price / 100);

export function numberWithCommas(x: any): any {
  return String(x.toFixed(3));
}
export const getDependsProp = (arrayProps: any, dependencyArray: any) => {
  return arrayProps.filter((prop: any) => R.includes(prop.id, dependencyArray));
};
