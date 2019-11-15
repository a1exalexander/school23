import React from 'react';
import { Page } from '../../components';
import { useRouter } from 'next/router';
import { SUp } from '../../components';
import NButton from '../../components/common/buttons/SButton';
import Link from 'next/link';
import { routes } from '../../constants';
import content from './test.json';

const NewsPost = () => {
  const router = useRouter();
  const { nid } = router.query;

  const createMarkup = () => ({
    __html: `${content.title}<br/><br/>${content.text}`
  });

  return (
    <Page title={nid}>
    <article className="news-post">
      <SUp />
      <header className="news-post__header">
        <Link href={routes.NEWS}>
            <a className="news-post__button-back is-desktop">
              <NButton size="small">
                Переглянути усі новини
              </NButton>
            </a>
          </Link>
        <div className="news-post__info">
          <span className="news-post__description">Пост від 22.11.2019</span>
        </div>
      </header>
      <div className='news-post__container' dangerouslySetInnerHTML={createMarkup()} />
      <div className='news-post__bottom-bar'>
        <Link href={routes.NEWS}>
          <a>
            <NButton size="big" fluid type="secondary">
              Переглянути усі новини
            </NButton>
          </a>
        </Link>
      </div>
    </article>
    </Page>
  );
};

export default NewsPost;
