import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { clock } from '../../../utils';
import moment from 'moment';
// import Clock from 'react-clock'

const SNavigationInfo = ({ className = ''  }) => {
  const setCurrentTime = () => moment().format('HH:mm');

  const [state, setState] = useState({...clock()});
  const [time, setTime] = useState(setCurrentTime());
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setInterval(() => {
      setTime(setCurrentTime())
      setState(clock())
      setDate(new Date())
    }, 1000)
  }, [])

  return (
    <div className={classNames('nav-info', state.type, className)}>
      <span className='nav-info__time'>{time}</span>
      {/* <Clock value={date.date}/> */}
      <span className='nav-info__text'>{state.msg}</span>
    </div>
  )
};

export default SNavigationInfo;
