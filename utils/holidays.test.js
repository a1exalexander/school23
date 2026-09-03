import { expect } from 'chai';
import { getHoliday, isHoliday, HOLIDAY_TYPE, PUBLIC_HOLIDAYS } from './holidays';

describe('Utils: holidays', () => {
  it('літні канікули тривають з 1 червня до 31 серпня', () => {
    expect(isHoliday('2026-05-31')).to.equal(false);
    expect(isHoliday('2026-06-01')).to.equal(true);
    expect(isHoliday('2026-07-10')).to.equal(true);
    expect(isHoliday('2026-08-31')).to.equal(true);
    expect(isHoliday('2026-09-01')).to.equal(false);
    expect(getHoliday('2026-07-10')).to.deep.equal({
      msg: 'Літні канікули! 🌞',
      type: HOLIDAY_TYPE
    });
  });

  it('зимові канікули переходять через Новий рік', () => {
    expect(isHoliday('2025-12-28')).to.equal(false);
    expect(isHoliday('2025-12-29')).to.equal(true);
    expect(isHoliday('2026-01-06')).to.equal(true);
    expect(isHoliday('2026-01-07')).to.equal(false);
  });

  it('державні свята мають власну назву', () => {
    expect(getHoliday('2026-01-01').msg).to.equal(PUBLIC_HOLIDAYS['01-01']);
    expect(getHoliday('2025-12-25').msg).to.equal(PUBLIC_HOLIDAYS['12-25']);
    expect(getHoliday('2026-08-24').msg).to.equal(PUBLIC_HOLIDAYS['08-24']);
    expect(getHoliday('2026-10-01').type).to.equal(HOLIDAY_TYPE);
  });

  it('звичайний навчальний день не є святом', () => {
    expect(getHoliday('2026-09-15')).to.equal(null);
    expect(getHoliday('2026-03-09')).to.equal(null);
  });
});
