import moment from 'moment';

moment.locale('uk');

export const HOLIDAY_TYPE = 'holiday';

/**
 * Канікули, які не залежать від рішення педради, — їх дати однакові щороку.
 * Формат ключів — 'MM-DD'. Проміжок може переходити через Новий рік
 * (коли `from` більший за `to`).
 */
export const BREAKS = [
  {
    id: 'summer',
    from: '06-01',
    to: '08-31',
    msg: 'Літні канікули! 🌞'
  },
  {
    id: 'winter',
    from: '12-29',
    to: '01-06',
    msg: 'Зимові канікули! ❄️'
  }
];

/**
 * Єдиний вихідний із власною назвою — решта державних свят зараз
 * у школах не є вихідними днями.
 */
export const PUBLIC_HOLIDAYS = {
  '01-01': 'Новий рік! 🎉'
};

export const toDayKey = (date = moment()) => moment(date).format('MM-DD');

export const isDayInBreak = ({ from, to }, day) =>
  from <= to ? day >= from && day <= to : day >= from || day <= to;

/**
 * Повертає повідомлення про свято або канікули на задану дату,
 * або `null`, якщо це звичайний навчальний день.
 */
export const getHoliday = (date = moment()) => {
  const day = toDayKey(date);
  const publicHoliday = PUBLIC_HOLIDAYS[day];
  if (publicHoliday) return { msg: publicHoliday, type: HOLIDAY_TYPE };

  const holidayBreak = BREAKS.find((item) => isDayInBreak(item, day));
  if (holidayBreak) return { msg: holidayBreak.msg, type: HOLIDAY_TYPE };

  return null;
};

export const isHoliday = (date = moment()) => !!getHoliday(date);

export default getHoliday;
