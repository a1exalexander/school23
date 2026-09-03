import moment from 'moment';

/**
 * Splits a sorted list into entries with year dividers in between.
 * Returns items of two kinds:
 *   { kind: 'divider', year, key }  – a separator before the next year group
 *   { kind: 'item', item }          – the original element
 * The divider before the first group is skipped when that group is the
 * current year (the label would be redundant right under the page title).
 */
export const withYearDividers = (items, getYear) => {
  const list = Array.isArray(items) ? items : [];
  const currentYear = moment().year();
  const result = [];
  let previousYear = null;

  list.forEach((item, idx) => {
    const year = getYear(item);
    const isFirst = idx === 0;
    if (year && year !== previousYear && !(isFirst && year === currentYear)) {
      result.push({ kind: 'divider', year, key: `year-${year}` });
    }
    if (year) previousYear = year;
    result.push({ kind: 'item', item });
  });

  return result;
};

/** Year from a unix timestamp in seconds (posts' `created`). */
export const yearFromUnix = (seconds) => {
  const value = Number(seconds);
  return value ? moment(value * 1000).year() : null;
};

/** Year from a Firestore Timestamp or a Date (canteen `date`). */
export const yearFromDate = (date) => {
  if (!date) return null;
  const value = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
  const m = moment(value);
  return m.isValid() ? m.year() : null;
};

export default withYearDividers;
