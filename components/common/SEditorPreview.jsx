/* eslint-disable react/no-danger */
import { array, object, objectOf, oneOfType, string } from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { isString } from '../../utils';

export const SEditorPreview = ({ className, content, postType }) => {
  const getText = (delta = { ops: [] }) => {
    const cfg = { inlineStyles: true };
    const converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
    return converter.convert();
  };

  const createMarkup = () => {
    if (!content)
      return {
        __html: ''
      };
    return {
      __html: isString(content) ? content : getText(content)
    };
  };

  return (
    <div
      className={classNames('SEditorPreview ql-editor', className, {
        'is-announcement': postType === 'announcement'
      })}
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
};

SEditorPreview.defaultProps = {
  className: undefined,
  content: undefined,
  postType: undefined
};

SEditorPreview.propTypes = {
  className: string,
  postType: string,
  content: oneOfType([string, objectOf(oneOfType([string, object, array]))])
};

export default SEditorPreview;
