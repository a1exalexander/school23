import moment from 'moment';

moment.locale('uk')

const lessons = {
  l1: {
    time: '8:30:00',
    msg: 'Перший урок'
  },
  l2: {
    time: '9:25:00',
    msg: 'Другий урок'
  },
  l3: {
    time: '10:30:00',
    msg: 'Третій урок'
  },
  l4: {
    time: '11:30:00',
    msg: 'Четвертий урок'
  },
  l5: {
    time: '12:35:00',
    msg: `П'ятий урок`
  },
  l6: {
    time: '13:30:00',
    msg: 'Шостий урок'
  },
  l7: {
    time: '14:25:00',
    msg: 'Сьомий урок'
  },
  l8: {
    time: '15:20:00',
    msg: 'Восьмий урок'
  }
};

const breaks = {
  b1: {
    time: '9:15:00',
    msg: 'Перерва перед 2-м уроком'
  },
  b2: {
    time: '10:10:00',
    msg: 'Перерва перед 3-м уроком'
  },
  b3: {
    time: '11:15:00',
    msg: 'Перерва перед 4-м уроком'
  },
  b4: {
    time: '12:15:00',
    msg: `Перерва перед 5-м уроком`
  },
  b5: {
    time: '13:20:00',
    msg: `Перерва перед 6-м уроком`
  },
  b6: {
    time: '14:15:00',
    msg: 'Остання перерва'
  },
  b7: {
    time: '15:10:00',
    msg: 'Навчання закінчено'
  },
  b8: {
    time: '16:05:00',
    msg: 'Завтра о 08:30 в школу'
  }
};

const more = time => moment().diff(moment(time, 'H:mm:ss'), 'seconds') >= 0;
const less = time => moment().diff(moment(time, 'H:mm:ss'), 'seconds') < 0;
const isTime = (a, b) => more(a) && less(b);

const isWeekday = () => moment().format('dd') === 'сб';
const nextWeekday = () => moment().add(1, 'day').format('dd') === 'сб';

const getLesson = (msg) => ({msg, type: 'lesson'});
const getBreak = (msg) => ({msg, type: 'break'});

const clock = () => {
  const { l1, l2, l3, l4, l5, l6, l7, l8 } = lessons;
  const { b1, b2, b3, b4, b5, b6, b7, b8 } = breaks;

  switch (true) {
    case isTime(l1.time, b1.time):
      return getLesson(l1.msg);
    case isTime(b1, l2):
      return getBreak(b1.msg);
    case isTime(l2.time, b2.time):
      return getLesson(l2.msg);
    case isTime(b2, l3):
      return getBreak(b2.msg);
    case isTime(l3.time, b3.time):
      return getLesson(l3.msg);
    case isTime(b3, l4):
      return getBreak(b3.msg);
    case isTime(l4.time, b4.time):
      return getLesson(l4.msg);
    case isTime(b4, l5):
      return getBreak(b4.msg);
    case isTime(l5.time, b5.time):
      return getLesson(l5.msg);
    case isTime(b5, l6):
      return getBreak(b5.msg);
    case isTime(l6.time, b6.time):
      return getLesson(l6.msg);
    case isTime(b6, l7):
      return getBreak(b6.msg);
    case isTime(l7.time, b7.time):
      return getLesson(l7.msg);
    case isTime(b7, l8):
      return getBreak(b7.msg);
    case isTime(l8.time, b8.time):
      return getLesson(l8.msg);
    case isTime(b8.time, '24:00:00') && !nextWeekday():
      return {msg: b8.msg, type: 'after'};
    case nextWeekday():
      return {msg: 'Завтра вихідний! 🔥', type: 'after'}
    case isWeekday():
      return {msg: `${moment().format('dddd')}, нарешті! 🚀`, type: 'after'}
    default:
      return {msg: `${moment('08:30:00', 'HH:mm:00').calendar()} в школу`, type: 'before'};
  }
};

export default clock;
