import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { clock } from '../../../utils';
import moment from 'moment';

const SNavigationInfo = ({ className = ''  }) => {

  const colorType = 'class';

  const setCurrentTime = () => moment().format('H:mm:ss');

  const [state, setState] = useState({...clock()});
  const [time, setTime] = useState(setCurrentTime())

  useEffect(() => {
    setInterval(() => {
      setTime(setCurrentTime())
      setState(clock())
    }, 1000)
  }, [])

  return (
    <div className={classNames('nav-info', colorType, className)}>
      <span className='nav-info__time'>{time}</span>
      <span className='nav-info__text'>{state.msg}</span>
    </div>
  )
};

export default SNavigationInfo;
