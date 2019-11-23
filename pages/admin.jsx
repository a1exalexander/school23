import React, { useState } from 'react';
import { ADMIN_NEWS, ADMIN_TEACHERS, ADMIN_CONTACTS, ADMIN_LAW } from '../constants';
import { Page, SRadioSlider, STransitionSwitch } from '../components';
import { connect } from 'react-redux';
import { actions } from '../store/modules/auth';
import AdminPost from '../components/views/admin/AdminPost';

const Admin = (props) => {

  const [state, setState] = useState(ADMIN_NEWS);

  const rendred = () => {
    switch (state) {
      case ADMIN_NEWS:
        return <AdminPost />;
      default:
        return <AdminPost />;
    }
  }

  return (
    <Page title="Кабінет адміністратора">
      <div className="admin">
        <h1 className='admin__title'>Кабінет адміністратора</h1>
        <div className="admin__container">
          <div className="admin__navigation">
            <SRadioSlider className='mobile-fluid' onChange={setState} name='law' checked={state} tabs={[ADMIN_NEWS, ADMIN_LAW, ADMIN_TEACHERS, ADMIN_CONTACTS]}/>
          </div>
          <div className='admin__view'>
            <STransitionSwitch keyProp={state}>
              {rendred()}
            </STransitionSwitch>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default connect()(Admin);
