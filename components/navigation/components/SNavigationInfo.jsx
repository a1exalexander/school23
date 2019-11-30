import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { clock } from '../../../utils';
import moment from 'moment';
import dynamic from 'next/dynamic';

const Clock = dynamic(() => import('react-clock'), { ssr: false });

const SNavigationInfo = ({ className = '' }) => {
  const setCurrentTime = () => moment().format('HH:mm');

  const [state, setState] = useState({ ...clock() });
  const [time, setTime] = useState(setCurrentTime());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(setCurrentTime());
      setState(clock());
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={classNames('nav-info', state.type, className)}>
      <span className="nav-info__time">{time}</span>
      <Clock
        className='nav-info__clock'
        size={28}
        hourHandWidth={2}
        secondHandLength={90}
        renderHourMarks={false}
        renderMinuteMarks={false}
        value={date}
      />
      <span className="nav-info__text">{state.msg}</span>
    </div>
  );
};

export default SNavigationInfo;
