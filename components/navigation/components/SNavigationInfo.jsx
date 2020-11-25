import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { clock } from '../../../utils';
import { STransition } from '../../common/transition';

const Clock = dynamic(() => import('react-clock'), { ssr: false });

const SNavigationInfo = ({ className = '' }) => {
  const setCurrentTime = () => moment().format('HH:mm');

  const [state, setState] = useState();
  const [time, setTime] = useState(setCurrentTime());
  const [date, setDate] = useState(new Date());

  const { time: stateTime } = useSelector((storeState) => storeState.clock);

  useEffect(() => {
    const doClock = () => {
      if (stateTime) {
        setTime(setCurrentTime());
        setState(clock(stateTime));
        setDate(new Date());
      }
    };
    doClock();
    const timer = setInterval(() => {
      doClock();
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateTime]);

  return (
    <STransition inProp={!!state}>
      <div className={classNames('nav-info', state?.type, className)}>
        <span className="nav-info__time">{time}</span>
        <Clock
          className="nav-info__clock"
          size={28}
          hourHandWidth={2}
          secondHandLength={90}
          renderHourMarks={false}
          renderMinuteMarks={false}
          value={date}
        />
        <span className="nav-info__text">{state?.msg}</span>
      </div>
    </STransition>
  );
};

export default SNavigationInfo;
