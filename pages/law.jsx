import React, { useEffect, useState, Fragment } from 'react';
import classNames from 'classnames';
import { Page, SBadge, SLoader, Empty, SButton } from '../components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconDownloadFile, IconClose } from '../components/common/icons';
import { actions } from '../store/modules/law';
import { getLaws, getOrders, getActs } from '../store/modules/law/getters';
import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

const Law = ({ laws, orders, isAuth, updateDoc, deleteDoc, acts, hasDocs, loading, fetchData }) => {
  const [state, setState] = useState({ loading, fileName: null, files: [] });

  const getType = type => {
    switch (true) {
      case !!type.match(/закон|зу/gi):
        return 'red';
      case !!type.match(/мініст|моу/gi):
        return 'yellow';
      case !!type.match(/управл|уос/gi):
        return 'blue';
      case !!type.match(/стат|шкіл/gi):
        return 'cyan';
      default:
        return 'green';
    }
  };

  const setLoading = (b) => setState(ps => ({ ...ps, loading: b }))

  useEffect(() => {
    fetchData();
  }, []);

  const openChange = fileName => {
    setState(ps => ({ ...ps, fileName }));
  };

  const handleChange = (files) => setState(ps => ({ ...ps, files }))

  const changeFile = async (doc) => {
    setLoading(true);
    const file = state.files[0].file;
    await updateDoc(doc, file);
    setLoading(false);
    closeChange();
  }

  const closeChange = () => setState(ps => ({ ...ps, fileName: null }));

  const removeFile = async doc => {
    setLoading(true);
    await deleteDoc(doc);
    setLoading(false);
    closeChange();
  };

  const adminBar = (doc) => {
    return isAuth && (
      <>
        {state.fileName === doc.fileName && (
          <div className="law__change-doc animated fast fadeIn">
            <FilePond
              files={state.files}
              allowMultiple={false}
              onupdatefiles={handleChange}
              labelIdle={`Перетягни файл сюди або <br/><span class="filepond--label-action"> обери файл </span>`}
            />
            <div className='law__buttons-wrapper'>
              <SButton type='white' onClick={closeChange}>Назад</SButton>
              <SButton disabled={!state.files.length} onClick={() => changeFile(doc)}>Оновити</SButton>
            </div>
          </div>
        )}
        <SButton
          onClick={() => openChange(doc.fileName)}
          size="small"
          type="white"
          className="law__button"
          label="Оновити"
        />
        <SButton
          onClick={() => removeFile(doc)}
          size="small"
          type="danger"
          className="law__button"
          label="Видалити"
        />
      </>
    );
  };

  const renderList = list => {
    return list.map(item => {
      return (
        <li key={String(item.id)} className="law__item">
          <div className="law__link-wrapper">
            <a href={item.url} target="_blank" className="law__link">
              <IconDownloadFile className="law__icon" />
            </a>
          </div>
          <div className="law__content-wrapper">
            <h2 className={classNames("law__name", {margin: isAuth})}>{item.title}</h2>
            <div className="law__info">
              <SBadge className="law__badge" color={getType(item.type)} label={item.type} />
              {adminBar(item)}
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <Page title="Нормативно-правові акти">
      <div className="law">
        <h1 className="law__title">Нормативно-правові акти</h1>
        <SLoader loading={loading}>
          <Fragment>
            <section className="law__section">
              <h2 className="law__caption">Закони</h2>
              <ul className="law__list">{renderList(laws)}</ul>
            </section>
            <section className="law__section">
              <h2 className="law__caption">Накази міністерства</h2>
              <ul className="law__list">{renderList(orders)}</ul>
            </section>
            <section className="law__section">
              <h2 className="law__caption">Інші підзаконні акти</h2>
              <ul className="law__list">{renderList(acts)}</ul>
            </section>
          </Fragment>
        </SLoader>
      </div>
    </Page>
  );
};

Law.propTypes = {
  laws: PropTypes.array,
  orders: PropTypes.array,
  acts: PropTypes.array,
  loading: PropTypes.bool,
  fetchData: PropTypes.func,
  hasDocs: PropTypes.bool,
  deleteDoc: PropTypes.func,
  updateDoc: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default connect(
  ({auth: { status },  law: { loading, docs } }) => ({
    loading,
    laws: getLaws(docs),
    orders: getOrders(docs),
    acts: getActs(docs),
    hasDocs: !!docs.length,
    isAuth: status,
  }),
  { fetchData: actions.fetchData, deleteDoc: actions.deleteDoc, updateDoc: actions.updateDoc }
)(Law);
