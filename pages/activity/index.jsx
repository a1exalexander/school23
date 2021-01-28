/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityCard } from '../../components/views/activty/ActivityCard';
import { SLoader, Empty } from '../../components';
import { IconSearch } from '../../components/common/icons';
import { getters, actions } from '../../store/modules/activity';
import { Page } from '../../components/Page';
import { Header } from '../../components/Header';

const Public = () => {
  const [state, setState] = useState('');

  const { loading, pages = [] } = useSelector((store) => store.activity || {});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  useEffect(() => {
    dispatch(actions.getActivityPosts());
  }, [dispatch]);

  const filteredPages = useMemo(() => getters.filteredPages(pages)(state), [pages, state]);

  return (
    <Page title="Діяльність Гімназії" className="public">
      <Header title="Діяльність Гімназії" className="_mobile-pb">
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
      </Header>
      <SLoader loading={loading}>
        {pages.length || loading ? (
          <div className="public__grid">
            {filteredPages.map((post, idx) => {
              return <ActivityCard key={post.id} idx={idx} post={post} className="public__card" />;
            })}
          </div>
        ) : (
          <Empty />
        )}
      </SLoader>
    </Page>
  );
};

export default Public;
