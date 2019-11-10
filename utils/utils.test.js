import jsc from "jsverify";
import * as utils from './index';

describe('Utils', () => {
  it('isString', () => {
    expect(utils.isString(jsc.string.generator(100))).toEqual(true);
    expect(utils.isString(jsc.number.generator(10000))).toEqual(false);
    expect(utils.isString(jsc.generator.array(jsc.nat.generator, 10))).toEqual(false);
    expect(utils.isString(null)).toEqual(false);
    expect(utils.isString(NaN)).toEqual(false);
    expect(utils.isString(undefined)).toEqual(false);
    expect(utils.isString(jsc.bool.generator())).toEqual(false);
  });
  it('isNumber', () => {
    expect(utils.isNumber(jsc.string.generator(100))).toEqual(false);
    expect(utils.isNumber(jsc.number.generator(100000))).toEqual(true);
    expect(utils.isNumber(jsc.generator.array(jsc.nat.generator, 10))).toEqual(false);
    expect(utils.isNumber(null)).toEqual(false);
    expect(utils.isNumber(NaN)).toEqual(false);
    expect(utils.isNumber(undefined)).toEqual(false);
    expect(utils.isNumber(jsc.bool.generator())).toEqual(false);
  });
})
