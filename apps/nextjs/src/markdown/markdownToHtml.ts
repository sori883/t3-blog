import markdownIt from 'markdown-it';
import mdAnchor from 'markdown-it-anchor'
import { sanitize } from '~/markdown/sanitizer';

export const markdownToHtml = (text: string) => {
  if (!(text?.length)) return '';
  
  const md = markdownIt({ breaks: true, linkify: true });
  md.linkify.set({ fuzzyLink: false });

  md.use(mdAnchor)

  return sanitize(md.render(text));
};
