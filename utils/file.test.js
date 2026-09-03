import { expect } from 'chai';
import {
  formatFileSize,
  getFileName,
  getFileSize,
  getImageTooLargeMessage,
  isFileSizeError,
  isFileTooLarge,
  isNetworkError
} from './file';
import { MAX_IMAGE_SIZE } from '../constants/upload';

const MB = 1024 * 1024;

describe('Utils: file', () => {
  it('getFileSize reads a File and a FilePond item', () => {
    expect(getFileSize({ size: 100 })).to.equal(100);
    expect(getFileSize({ fileSize: 200 })).to.equal(200);
    expect(getFileSize({ file: { size: 300 } })).to.equal(300);
    expect(getFileSize(undefined)).to.equal(0);
  });

  it('getFileName truncates long names', () => {
    expect(getFileName({ name: 'photo.jpg' })).to.equal('photo.jpg');
    expect(getFileName({ filename: 'photo.jpg' })).to.equal('photo.jpg');
    expect(getFileName({ name: 'a'.repeat(40) })).to.have.lengthOf(25);
    expect(getFileName(null)).to.equal('');
  });

  it('formatFileSize is readable', () => {
    expect(formatFileSize(512)).to.equal('512 Б');
    expect(formatFileSize(2048)).to.equal('2 КБ');
    expect(formatFileSize(2.5 * MB)).to.equal('2,5 МБ');
  });

  it('isFileTooLarge respects the 2 MB limit', () => {
    expect(MAX_IMAGE_SIZE).to.equal(2 * MB);
    expect(isFileTooLarge({ size: MAX_IMAGE_SIZE })).to.equal(false);
    expect(isFileTooLarge({ size: MAX_IMAGE_SIZE + 1 })).to.equal(true);
    expect(isFileTooLarge({ file: { size: 5 * MB } })).to.equal(true);
  });

  it('getImageTooLargeMessage mentions the file, its size and the limit', () => {
    const message = getImageTooLargeMessage([{ name: 'photo.jpg', size: 5 * MB }]);
    expect(message).to.contain('photo.jpg');
    expect(message).to.contain('5,0 МБ');
    expect(message).to.contain('2 МБ');

    const many = getImageTooLargeMessage([
      { name: 'a.jpg', size: 3 * MB },
      { name: 'b.jpg', size: 4 * MB }
    ]);
    expect(many).to.contain('a.jpg');
    expect(many).to.contain('b.jpg');
  });

  it('recognizes firebase storage errors', () => {
    expect(isFileSizeError({ code: 'storage/unauthorized' })).to.equal(true);
    expect(isFileSizeError({ code: 'storage/unknown' })).to.equal(false);
    expect(isNetworkError({ code: 'storage/retry-limit-exceeded' })).to.equal(true);
    expect(isNetworkError({ code: 'storage/unauthorized' })).to.equal(false);
  });
});
