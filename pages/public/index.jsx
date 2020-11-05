import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicCard } from '../../components/views/public/PublicCard';
import { Page, SLoader, Empty } from '../../components';
import { IconSearch } from '../../components/common/icons';
import { getters, actions } from '../../store/modules/public';

const Public = ({}) => {
  const [state, setState] = useState('');

  const { loading, pages = [] } = useSelector((state) => state.publicInfo || {});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  useEffect(() => {
    dispatch(actions.getPublicInfo());
  }, []);

  const filteredPages = useMemo(() => getters.filteredPages(pages)(state), [pages, state]);

  return (
    <Page title="Публічна Інформація">
      <div className="public">
        <header className="public__header">
          <h1 className="public__title">Публічна Інформація</h1>
          <label className="public__input-wrapper">
            <input
              value={state}
              onChange={handleChange}
              className="public__input"
              placeholder="Пошук..."
              type="text"
            />
            <IconSearch className="public__input-icon" />
          </label>
        </header>
        <SLoader loading={loading}>
          {pages.length || loading ? (
            <div className="public__grid">
              {filteredPages.map((post, idx) => {
                return <PublicCard key={post.id} idx={idx} post={post} className="public__card" />;
              })}
            </div>
          ) : (
            <Empty />
          )}
        </SLoader>
      </div>
    </Page>
  );
};

export default Public;
