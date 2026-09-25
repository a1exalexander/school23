import { expect } from 'chai';
import {
  isTitleRepeated,
  isTitleMisplaced,
  makeTitle,
  normalizePost,
  TITLE_MAX_LENGTH
} from './postTitle';

const ARTICLE =
  'Шановні батьки та учні! Повідомляємо, що з понеділка у гімназії змінюється розклад дзвінків. ' +
  'Перший урок починатиметься о 8:30, а велика перерва триватиме двадцять хвилин. ' +
  'Детальний розклад дивіться на сайті у розділі «Дзвінки».';

describe('Utils: postTitle', () => {
  it('довгий заголовок без тексту — це стаття, вставлена не в те поле', () => {
    expect(ARTICLE.length).to.be.above(TITLE_MAX_LENGTH);
    expect(isTitleMisplaced({ title: ARTICLE, text: '', delta: { ops: [] } })).to.equal(true);
    expect(
      isTitleMisplaced({ title: ARTICLE, text: '', delta: { ops: [{ insert: '\n' }] } })
    ).to.equal(true);
    expect(isTitleMisplaced({ title: 'День знань', text: '' })).to.equal(false);
    expect(isTitleMisplaced({ title: ARTICLE, text: 'Є текст' })).to.equal(false);
  });

  it('заголовок з перших слів: коротке перше речення або слова з «…»', () => {
    expect(makeTitle(ARTICLE)).to.equal('Шановні батьки та учні!');
    const long =
      'Сьогодні в гімназії відбулася урочиста лінійка присвячена Дню знань де зібралися всі учні і вчителі';
    const title = makeTitle(long);
    expect(title.endsWith('…')).to.equal(true);
    expect(title.length).to.be.at.most(81);
    expect(long.startsWith(title.slice(0, -1))).to.equal(true);
    expect(makeTitle('Коротко')).to.equal('Коротко');
  });

  it('переносить текст із заголовка в тіло і зберігає решту полів', () => {
    const image = { insert: { image: 'https://example.com/a.jpg' } };
    const post = {
      id: '1',
      title: ARTICLE,
      text: '',
      delta: { ops: [image, { insert: '\n' }] },
      images: [{ id: 'x', src: 'https://example.com/b.jpg' }],
      video: 'https://facebook.com/v',
      likes: 5,
      created: 100
    };
    const fixed = normalizePost(post);
    expect(fixed.title).to.equal('Шановні батьки та учні!');
    expect(fixed.text).to.equal(ARTICLE);
    expect(fixed.delta.ops[0]).to.deep.equal({ insert: `${ARTICLE}\n` });
    expect(fixed.delta.ops).to.deep.include(image);
    expect(fixed.images).to.equal(post.images);
    expect(fixed.video).to.equal(post.video);
    expect(fixed.likes).to.equal(5);
    expect(fixed.created).to.equal(100);
    expect(isTitleMisplaced(fixed)).to.equal(false);
  });

  it('не чіпає правильно заповнені записи', () => {
    const post = { title: 'День знань', text: 'Текст', delta: { ops: [{ insert: 'Текст\n' }] } };
    expect(normalizePost(post)).to.equal(post);
  });

  it('заголовок повторюється, лише коли текст з нього починається', () => {
    expect(isTitleRepeated(normalizePost({ title: ARTICLE, text: '' }))).to.equal(true);
    expect(isTitleRepeated({ title: 'Шановні батьки…', text: 'Шановні батьки, увага!' })).to.equal(
      true
    );
    expect(isTitleRepeated({ title: 'День знань', text: 'Сьогодні свято' })).to.equal(false);
    expect(isTitleRepeated({ title: 'Увага', text: 'Увагам батьків' })).to.equal(false);
    expect(isTitleRepeated({ title: '', text: 'Текст' })).to.equal(false);
  });
});
