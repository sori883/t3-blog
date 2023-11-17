import markdownIt from 'markdown-it';
import { sanitize } from '~/components/elements/markdown';

export const markdownToHtml = (text: string) => {
  if (!(text?.length)) return '';
  
  const md = markdownIt({ breaks: true, linkify: true });
  md.linkify.set({ fuzzyLink: false });

  return sanitize(md.render(text));
};
