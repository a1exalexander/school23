import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { actions } from '../store/modules/notifications';
import { transitionClasses } from './index';
import SNotification from './common/SNotification';

const TheNotifications = ({ removeNotification, notifications }) => {
  return (
    <div className="the-notifications">
      <TransitionGroup>
        {notifications.map(({ id, message, type }) => {
          return (
            <CSSTransition
              key={id}
              timeout={{ enter: 200, exit: 400 }}
              classNames={transitionClasses.notifications}
            >
              <SNotification onClick={() => removeNotification(id)} message={message} type={type} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

TheNotifications.defaultProps = {
  removeNotification: () => undefined,
  notifications: []
};

TheNotifications.propTypes = {
  removeNotification: PropTypes.func,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      id: PropTypes.string,
      type: PropTypes.string
    })
  )
};

export default connect(({ notifications: { list } }) => ({ notifications: list }), {
  removeNotification: actions.removeNotification
})(TheNotifications);
