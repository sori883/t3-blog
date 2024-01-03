/**
 * forked from https://github.com/zenn-dev/zenn-editor
 */
import markdownIt from 'markdown-it';

import { sanitize } from './sanitizer';
import type { MarkdownOptions } from './types';
import { embedGenerators } from './embed';

import {
  mdBr,
  mdLinkAttributes,
  mdLinkifyToCard,
  containerDetailsOptions,
  containerMessageOptions,
} from './utils';

import markdownItAnchor from 'markdown-it-anchor'
import mdFootnote from 'markdown-it-footnote';
import markdownItImSize from '@steelydylan/markdown-it-imsize';
import taskLists from '@hedgedoc/markdown-it-task-lists'
import mdContainer from "markdown-it-container"


export const markdownToHtml = (text: string, options?: MarkdownOptions) => {
  if (!(text?.length)) return '';

  const markdownOptions: MarkdownOptions = {
    ...options,
    customEmbed: {
      ...embedGenerators,
      ...options?.customEmbed,
    },
  };
  
  const md = markdownIt({ breaks: true, linkify: true });
  md.linkify.set({ fuzzyLink: false });

  md
  .use(mdBr)
  .use(mdFootnote)
  .use(markdownItImSize)
  .use(mdLinkAttributes)
  .use(mdLinkifyToCard, markdownOptions)
  .use(taskLists, { enabled: true })
  .use(mdContainer, 'details', containerDetailsOptions)
  .use(mdContainer, 'message', containerMessageOptions)
  .use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'before',
      class: 'header-anchor-link',
      symbol: '',
    }),
    tabIndex: false,
  });
  return sanitize(md.render(text));
};
