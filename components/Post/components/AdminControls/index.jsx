import { bool, func } from 'prop-types';
import React from 'react';
import { SButton } from '../../../common/buttons';

const AdminControls = ({ visible, active, onRemove, onEditorVisibleChange }) => {
  return (
    visible && (
      <>
        {active ? (
          <SButton
            onClick={() => onEditorVisibleChange(false)}
            type="white"
            className="post__button-edit"
            size="small"
          >
            Відмінити
          </SButton>
        ) : (
          <SButton
            onClick={() => onEditorVisibleChange(true)}
            type="white"
            className="post__button-edit"
            size="small"
          >
            Редагувати
          </SButton>
        )}
        <SButton onClick={onRemove} type="danger" className="post__button-edit" size="small">
          Видалиити
        </SButton>
      </>
    )
  );
};

AdminControls.defaultProps = {
  visible: false,
  active: false,
  onRemove: () => undefined,
  onEditorVisibleChange: () => undefined
};

AdminControls.propTypes = {
  visible: bool,
  active: bool,
  onRemove: func,
  onEditorVisibleChange: func
};

export default AdminControls;
