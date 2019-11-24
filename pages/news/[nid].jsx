import React from 'react';
import PropTypes from 'prop-types';
import { Page, SButton } from '../../components';
import { SUp } from '../../components';
import Link from 'next/link';
import { routes } from '../../constants';
import content from './test.json';
import { db } from '../../firebase';
import { formatPost } from '../../models/post';
import moment from 'moment';

const NewsPost = ({ post }) => {

  const createMarkup = () => ({
    __html: post.text
  });

  return (
    <Page title={post.title}>
    <article className="news-post">
      <SUp />
      <header className="news-post__header">
        <Link href={routes.NEWS}>
            <a className="news-post__button-back is-desktop">
              <SButton size="small">
                Переглянути усі новини
              </SButton>
            </a>
          </Link>
        <div className="news-post__info">
          <span className="news-post__description">Пост від {moment(post.created * 1000).format('DD.MM.YYYY')}</span>
        </div>
      </header>
      <div className='news-post__container'>
        <h1 className='news-post__title'>{post.title}</h1>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
      </div>
      <div className='news-post__bottom-bar'>
        <Link href={routes.NEWS}>
          <a>
            <SButton size="big" fluid type="secondary">
              Переглянути усі новини
            </SButton>
          </a>
        </Link>
      </div>
    </article>
    </Page>
  );
};

NewsPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    created: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  })
}

NewsPost.getInitialProps = async ({ query }) => {
  const res = await db.getPost(query.nid);
  return { post: {...formatPost(res)} };
}

export default NewsPost;
