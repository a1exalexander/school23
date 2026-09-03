import moment from 'moment';
import { getHoliday } from './holidays';

moment.locale('uk');

const timeModel = {
  l1: {
    time: '8:30',
    msg: 'Перший урок'
  },
  l2: {
    time: '9:25',
    msg: 'Другий урок'
  },
  l3: {
    time: '10:30',
    msg: 'Третій урок'
  },
  l4: {
    time: '11:30',
    msg: 'Четвертий урок'
  },
  l5: {
    time: '12:35',
    msg: `П'ятий урок`
  },
  l6: {
    time: '13:30',
    msg: 'Шостий урок'
  },
  l7: {
    time: '14:25',
    msg: 'Сьомий урок'
  },
  l8: {
    time: '15:20',
    msg: 'Восьмий урок'
  },
  b1: {
    time: '9:15',
    msg: 'Перерва перед 2-м уроком'
  },
  b2: {
    time: '10:10',
    msg: 'Перерва перед 3-м уроком'
  },
  b3: {
    time: '11:15',
    msg: 'Перерва перед 4-м уроком'
  },
  b4: {
    time: '12:15',
    msg: `Перерва перед 5-м уроком`
  },
  b5: {
    time: '13:20',
    msg: `Перерва перед 6-м уроком`
  },
  b6: {
    time: '14:15',
    msg: 'Остання перерва'
  },
  b7: {
    time: '15:10',
    msg: 'Навчання закінчено'
  },
  b8: {
    time: '16:05',
    msg: 'Завтра о 08:30 в школу'
  }
};

export const more = (time) => moment().diff(moment(time, 'H:mm'), 'seconds') >= 0;
export const less = (time) => moment().diff(moment(time, 'H:mm'), 'seconds') < 0;
const isTime = (a, b) => more(a) && less(b);

const isWeekday = () => ['сб', 'нд'].includes(moment().format('dd'));
const getLesson = (msg) => ({ msg, type: 'lesson' });
const getBreak = (msg) => ({ msg, type: 'break' });

const clock = (state) => {
  const holiday = getHoliday();
  if (holiday) return holiday;

  const shallowTime = { ...timeModel };
  Object.entries(timeModel).forEach(([key, value]) => {
    shallowTime[key] = { ...value, time: state[key] };
  });
  const { l1, l2, l3, l4, l5, l6, l7, l8, b1, b2, b3, b4, b5, b6, b7, b8 } = shallowTime;

  const nextWeekday = () => ['пт'].includes(moment().format('dd')) && !isTime(l1.time, b8.time);

  switch (true) {
    case isTime(b8.time, '24:00') && !nextWeekday() && moment().format('dd') !== 'сб':
      return { msg: b8.msg, type: 'after' };
    case isWeekday():
      return { msg: `${moment().format('dddd')}, нарешті! 🚀`, type: 'after' };
    case nextWeekday():
      return { msg: 'Завтра вихідний! 🔥', type: 'after' };
    case isTime(l1.time, b1.time):
      return getLesson(l1.msg);
    case isTime(b1.time, l2.time):
      return getBreak(b1.msg);
    case isTime(l2.time, b2.time):
      return getLesson(l2.msg);
    case isTime(b2.time, l3.time):
      return getBreak(b2.msg);
    case isTime(l3.time, b3.time):
      return getLesson(l3.msg);
    case isTime(b3.time, l4.time):
      return getBreak(b3.msg);
    case isTime(l4.time, b4.time):
      return getLesson(l4.msg);
    case isTime(b4.time, l5.time):
      return getBreak(b4.msg);
    case isTime(l5.time, b5.time):
      return getLesson(l5.msg);
    case isTime(b5.time, l6.time):
      return getBreak(b5.msg);
    case isTime(l6.time, b6.time):
      return getLesson(l6.msg);
    case isTime(b6.time, l7.time):
      return getBreak(b6.msg);
    case isTime(l7.time, b7.time):
      return getLesson(l7.msg);
    case isTime(b7.time, l8.time):
      return getBreak(b7.msg);
    case isTime(l8.time, b8.time):
      return getLesson(l8.msg);
    default:
      return { msg: `${moment('08:30', 'HH:mm').calendar()} в школу`, type: 'before' };
  }
};

export default clock;
