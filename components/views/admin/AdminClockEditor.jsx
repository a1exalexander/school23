import { string } from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { actions } from '../../../store/modules/clock';
import { actions as notifications } from '../../../store/modules/notifications';
import { SButton } from '../../common/buttons';
import { db } from '../../../firebase';
import { actionType, ERROR_NOTIFICATION_TIMEOUT } from '../../../constants';

// In the stored schedule `lN` is the start of lesson N and `bN` is the start of the break
// after it, which is the same moment as the end of that lesson.
const LESSONS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  n,
  startKey: `l${n}`,
  endKey: `b${n}`
}));

/** '8:5' -> '08:05', anything unreadable -> '' (an empty time input) */
const toInputTime = (value) => {
  const [hours, minutes] = String(value || '').split(':');
  if (!hours || !minutes) return '';
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

const toMinutes = (value) => {
  const time = moment(value, 'HH:mm', true);
  return time.isValid() ? time.hours() * 60 + time.minutes() : null;
};

const normalize = (time) =>
  Object.entries(time || {}).reduce((acc, [key, value]) => {
    acc[key] = toInputTime(value);
    return acc;
  }, {});

/**
 * Returns a readable problem for every lesson whose time doesn't add up,
 * so a mistake is visible before the schedule gets to the site.
 */
const getErrors = (time) => {
  const errors = {};
  LESSONS.forEach(({ n, startKey, endKey }, idx) => {
    const start = toMinutes(time[startKey]);
    const end = toMinutes(time[endKey]);
    if (start === null || end === null) {
      errors[n] = 'Вкажіть час початку і кінця';
      return;
    }
    if (end <= start) {
      errors[n] = 'Урок має закінчуватись пізніше, ніж починається';
      return;
    }
    const prev = LESSONS[idx - 1];
    const prevEnd = prev ? toMinutes(time[prev.endKey]) : null;
    if (prevEnd !== null && start < prevEnd) {
      errors[n] = `Урок починається раніше, ніж закінчується ${prev.n} урок`;
    }
  });
  return errors;
};

const getBreakLength = (time, idx) => {
  const next = LESSONS[idx + 1];
  if (!next) return null;
  const end = toMinutes(time[LESSONS[idx].endKey]);
  const nextStart = toMinutes(time[next.startKey]);
  if (end === null || nextStart === null || nextStart < end) return null;
  return nextStart - end;
};

export const AdminClockEditor = ({ className }) => {
  const { time: savedTime } = useSelector((state) => state.clock);
  const dispatch = useDispatch();

  const [time, setTime] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (savedTime && !time) setTime(normalize(savedTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedTime]);

  if (!time) {
    return (
      <p className={classNames('AdminClockEditor', 'AdminClockEditor__hint', className)}>
        Завантажуємо розклад…
      </p>
    );
  }

  const initial = normalize(savedTime);
  const hasChanges = !isEqual(time, initial);
  const errors = getErrors(time);
  const hasErrors = Object.keys(errors).length > 0;

  const onChange = (key) => (e) => {
    const { value } = e.target;
    setTime((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = async () => {
    setSaving(true);
    const res = await db.saveClock(time);
    setSaving(false);
    if (res) {
      dispatch(actions[actionType.CLOCK_UPDATE](time));
      dispatch(notifications.notify('success', 'Розклад дзвінків збережено'));
    } else {
      dispatch(
        notifications.notify(
          'error',
          'Не вдалося зберегти розклад. Перевірте інтернет і спробуйте ще раз',
          ERROR_NOTIFICATION_TIMEOUT
        )
      );
    }
  };

  return (
    <div className={classNames('AdminClockEditor', className)}>
      <p className="AdminClockEditor__hint">
        Вкажіть, коли починається і закінчується кожен урок. За цим розкладом годинник на головній
        сторінці та в меню показує, що зараз триває — урок чи перерва.
      </p>
      <ol className="AdminClockEditor__list">
        {LESSONS.map(({ n, startKey, endKey }, idx) => {
          const breakLength = getBreakLength(time, idx);
          return (
            <li key={n} className="AdminClockEditor__lesson">
              <div className={classNames('AdminClockEditor__item', { _error: errors[n] })}>
                <span className="AdminClockEditor__label">{`${n} урок`}</span>
                <label className="AdminClockEditor__field" htmlFor={startKey}>
                  <span className="AdminClockEditor__caption">початок</span>
                  <input
                    id={startKey}
                    type="time"
                    className="AdminClockEditor__input"
                    value={time[startKey] || ''}
                    onChange={onChange(startKey)}
                  />
                </label>
                <span className="AdminClockEditor__dash">—</span>
                <label className="AdminClockEditor__field" htmlFor={endKey}>
                  <span className="AdminClockEditor__caption">кінець</span>
                  <input
                    id={endKey}
                    type="time"
                    className="AdminClockEditor__input"
                    value={time[endKey] || ''}
                    onChange={onChange(endKey)}
                  />
                </label>
              </div>
              {errors[n] && <p className="AdminClockEditor__error">{errors[n]}</p>}
              {breakLength !== null && (
                <p className="AdminClockEditor__break">{`перерва ${breakLength} хв`}</p>
              )}
            </li>
          );
        })}
      </ol>
      <div className="AdminClockEditor__btns">
        <SButton
          onClick={onSave}
          className="AdminClockEditor__btn"
          loading={saving}
          disabled={!hasChanges || hasErrors || saving}
          label="Зберегти розклад"
        />
        <SButton
          onClick={() => setTime(initial)}
          className="AdminClockEditor__btn"
          type="transparent"
          disabled={!hasChanges || saving}
          label="Скасувати зміни"
        />
      </div>
      {hasChanges && hasErrors && (
        <p className="AdminClockEditor__error">Виправте помилки в розкладі, щоб зберегти його</p>
      )}
    </div>
  );
};

AdminClockEditor.defaultProps = {
  className: null
};

AdminClockEditor.propTypes = {
  className: string
};

export default AdminClockEditor;
