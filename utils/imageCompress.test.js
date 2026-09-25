import { expect } from 'chai';
import { fitSize, toJpegName } from './imageCompress';

describe('Utils: imageCompress', () => {
  it('fitSize keeps small pictures as they are', () => {
    expect(fitSize(800, 600, 2560)).to.deep.equal({ width: 800, height: 600 });
  });

  it('fitSize shrinks the longer side and keeps proportions', () => {
    expect(fitSize(4000, 3000, 2000)).to.deep.equal({ width: 2000, height: 1500 });
    expect(fitSize(3000, 6000, 2000)).to.deep.equal({ width: 1000, height: 2000 });
  });

  it('toJpegName swaps the extension', () => {
    expect(toJpegName('IMG_0001.PNG')).to.equal('IMG_0001.jpg');
    expect(toJpegName('photo')).to.equal('photo.jpg');
    expect(toJpegName('my.photo.jpeg')).to.equal('my.photo.jpg');
  });
});
