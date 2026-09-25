import { expect } from 'chai';
import { getVideoEmbedSrc, getVideoUrl, isVideoEmbeddable } from './postVideo';

describe('Utils: postVideo', () => {
  it('склеює посилання, збережене масивом окремих символів', () => {
    const url = 'https://fb.watch/odAJ6Cbvys/';
    expect(getVideoUrl(url.split(''))).to.equal(url);
    expect(getVideoUrl(`  ${url} `)).to.equal(url);
  });

  it('порожнє або дивне значення — це відсутність відео', () => {
    expect(getVideoUrl(undefined)).to.equal('');
    expect(getVideoUrl(null)).to.equal('');
    expect(getVideoUrl([])).to.equal('');
    expect(getVideoUrl({})).to.equal('');
  });

  it('вбудовує тільки посилання на відео', () => {
    [
      'https://www.facebook.com/trysyaloveden/videos/3220374681508761/?idorvanity=551337861920602',
      'https://fb.watch/odAJ6Cbvys/',
      'https://www.facebook.com/share/v/zs9dFRJp9nnSusjh/?mibextid=WC7FNe',
      'https://www.facebook.com/watch/?v=123',
      'https://www.facebook.com/reel/123'
    ].forEach((url) => expect(isVideoEmbeddable(url), url).to.equal(true));
    expect(isVideoEmbeddable('https://fb.watch/odAJ6Cbvys/'.split(''))).to.equal(true);
  });

  it('допис, група чи коротке посилання — не відео', () => {
    [
      'https://www.facebook.com/share/p/1F6qpbSP1u/?mibextid=wwXIfr',
      'https://www.facebook.com/share/1HjZ4WmAp9/?mibextid=wwXIfr',
      'https://www.facebook.com/groups/COLO23/permalink/1962347774152930/',
      ''
    ].forEach((url) => expect(isVideoEmbeddable(url), url).to.equal(false));
  });

  it('кодує посилання для плеєра, щоб його параметри не загубились', () => {
    const src = getVideoEmbedSrc('https://www.facebook.com/a/videos/1/?x=1&y=2');
    expect(src).to.contain(
      'href=https%3A%2F%2Fwww.facebook.com%2Fa%2Fvideos%2F1%2F%3Fx%3D1%26y%3D2&'
    );
  });
});
