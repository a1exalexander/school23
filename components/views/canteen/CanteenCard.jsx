import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { arrayOf, bool, func, oneOfType, shape, string } from 'prop-types';
import { SBadge, SButton } from '../../index';
import { SGallery } from '../../common/media/SGallery';
import { less, more } from '../../../utils/clock';

const toDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  return new Date(value);
};

export const getMenuStatus = (date) => {
  const day = toDate(date);
  if (!day) return { label: '', color: 'cyan', tone: 'past' };
  const m = moment(day);
  const label = m.calendar(null, {
    lastDay: '[Учора]',
    sameDay: '[Сьогодні]',
    nextDay: '[Завтра]',
    lastWeek: () =>
      ['ср', 'пт', 'сб', 'нд'].includes(m.format('dd')) ? '[Минулої] dddd' : '[Минулого] dddd',
    nextWeek: 'dddd',
    sameElse: 'D MMMM'
  });

  let color = 'red';
  let tone = 'past';
  switch (true) {
    case moment().isSame(day, 'day'):
      color = 'green';
      tone = 'today';
      break;
    case moment().add(1, 'day').isSame(day, 'day') && less('17:00:00'):
      color = 'yellow';
      tone = 'upcoming';
      break;
    case moment().add(1, 'day').isSame(day, 'day') && more('17:00:00'):
      color = 'green';
      tone = 'today';
      break;
    case moment().isBefore(day):
      color = 'yellow';
      tone = 'upcoming';
      break;
    default:
      break;
  }
  return { label, color, tone };
};

export const CanteenCard = ({ item, canRemove, onRemove, className }) => {
  const day = toDate(item.date);
  const status = getMenuStatus(item.date);
  const fullDate = day ? moment(day).format('dddd, D MMMM YYYY') : '';

  return (
    <article className={classNames('canteen-card', `_${status.tone}`, className)}>
      <header className="canteen-card__header">
        <div className="canteen-card__meta">
          <SBadge className="canteen-card__badge" color={status.color} label={status.label} />
          {fullDate && (
            <time className="canteen-card__date" dateTime={moment(day).format('YYYY-MM-DD')}>
              {fullDate}
            </time>
          )}
        </div>
        {item.title && <h2 className="canteen-card__title">{item.title}</h2>}
      </header>
      <SGallery
        className="canteen-card__gallery"
        images={item.images}
        alt={item.title || 'Меню шкільної їдальні'}
        aspect="square"
        thumbs={false}
      />
      {canRemove && (
        <footer className="canteen-card__footer">
          <SButton onClick={() => onRemove(item.id)} type="danger" size="small">
            Видалити
          </SButton>
        </footer>
      )}
    </article>
  );
};

CanteenCard.defaultProps = {
  canRemove: false,
  onRemove: () => undefined,
  className: undefined
};

CanteenCard.propTypes = {
  item: shape({
    id: string,
    title: string,
    date: oneOfType([shape({ toDate: func }), string]),
    images: arrayOf(oneOfType([string, shape({ id: string, src: string })]))
  }).isRequired,
  canRemove: bool,
  onRemove: func,
  className: string
};

export default CanteenCard;
