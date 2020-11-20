import { string, func } from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { actions } from '../../../store/modules/clock';
import { SInput } from '../../common/form';
import { SButton } from '../../common/buttons';
import { db } from '../../../firebase';
import { actionType } from '../../../constants';

const TimeItem = ({ label, value, onChange }) => {
  const [start, end] = useMemo(() => (value || ':').split(':'), [value]);

  const handleChange = (idx) => (val) => {
    if (idx === 0 && (val < 0 || val > 23)) return;
    if (idx === 1 && (val < 0 || val > 59)) return;

    const shallowCopy = [start, end];
    shallowCopy.splice(idx, 1, val);
    onChange(shallowCopy.join(':'));
  };

  return (
    <div className="AdminClockEditor__item">
      <div className="AdminClockEditor__label">{label}</div>
      <div className="AdminClockEditor__row">
        <SInput
          placeholder="hh"
          type="number"
          maxLength={2}
          className="AdminClockEditor__input"
          value={start}
          onChange={handleChange(0)}
        />
        {' : '}
        <SInput
          placeholder="mm"
          type="number"
          maxLength={2}
          className="AdminClockEditor__input"
          value={end}
          onChange={handleChange(1)}
        />
      </div>
    </div>
  );
};

TimeItem.defaultProps = {
  label: null,
  onChange: () => undefined
};

TimeItem.propTypes = {
  label: string,
  value: string.isRequired,
  onChange: func
};

export const AdminClockEditor = ({ className }) => {
  const [backUp, setBackUp] = useState();

  const { time } = useSelector((state) => state.clock);

  const dispatch = useDispatch();

  const handleChangeState = (key) => (val) => {
    dispatch(actions[actionType.CLOCK_UPDATE]({ ...time, [key]: val }));
  };

  const disabled = !backUp || isEqual(time, backUp);

  const onSave = async () => {
    const shallowTime = { ...time };
    Object.entries(time).forEach(([key, value]) => {
      const [start, end] = value.split(':');
      time[key] = `${start.padStart(2, '0')}:${end.padStart(2, '0')}`;
    });
    const res = await db.saveClock(shallowTime);
    if (res) {
      dispatch(actions[actionType.CLOCK_UPDATE](shallowTime));
      setBackUp(shallowTime);
    }
  };

  useEffect(() => {
    setBackUp({ ...time });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames('AdminClockEditor', className)}>
      <div className="AdminClockEditor__btns">
        <SButton
          onClick={onSave}
          className="AdminClockEditor__btn"
          type="transparent"
          disabled={disabled}
        >
          Зберегти
        </SButton>
        <SButton
          onClick={() => dispatch(actions[actionType.CLOCK_UPDATE](backUp))}
          className="AdminClockEditor__btn"
          type="warning"
          disabled={disabled}
        >
          Відмінити зміни
        </SButton>
      </div>
      <section className="AdminClockEditor__section">
        <h3 className="AdminClockEditor__title">Уроки та перерви</h3>
        <TimeItem value={time.l1} onChange={handleChangeState('l1')} label="1 урок" />
        <TimeItem value={time.b1} onChange={handleChangeState('b1')} label="1 перерва" />
        <TimeItem value={time.l2} onChange={handleChangeState('l2')} label="2 урок" />
        <TimeItem value={time.b2} onChange={handleChangeState('b2')} label="2 перерва" />
        <TimeItem value={time.l3} onChange={handleChangeState('l3')} label="3 урок" />
        <TimeItem value={time.b3} onChange={handleChangeState('b3')} label="3 перерва" />
        <TimeItem value={time.l4} onChange={handleChangeState('l4')} label="4 урок" />
        <TimeItem value={time.b4} onChange={handleChangeState('b4')} label="4 перерва" />
        <TimeItem value={time.l5} onChange={handleChangeState('l5')} label="5 урок" />
        <TimeItem value={time.b5} onChange={handleChangeState('b5')} label="5 перерва" />
        <TimeItem value={time.l6} onChange={handleChangeState('l6')} label="6 урок" />
        <TimeItem value={time.b6} onChange={handleChangeState('b6')} label="6 перерва" />
        <TimeItem value={time.l7} onChange={handleChangeState('l7')} label="7 урок" />
        <TimeItem value={time.b7} onChange={handleChangeState('b7')} label="7 перерва" />
        <TimeItem value={time.l8} onChange={handleChangeState('l8')} label="8 урок" />
        <TimeItem value={time.b8} onChange={handleChangeState('b8')} label="8 перерва" />
      </section>
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
