/*
  https://github.com/zenn-dev/zenn-editor/blob/canary/packages/zenn-markdown-html/src/utils/toc.ts
*/

import * as cheerio from 'cheerio';

export interface Toc {
  text: string;
  id: string;
  level: number;
  children: Toc[];
}

export function parseToc(html: string): Toc[] {
  const $ = cheerio.load(html);
  const headings = $("body > h2, body > h3").toArray();
  const headingsToc = headings.map((heading) => ({
    level: parseInt(heading.name.slice(1), 10),

    // eslint-disable-next-line no-control-regex
    text: $(heading).text().replace(/\x08/g, '').trim(),

    // markdown-it-anchor使用するので必ずある想定
    id: heading.attribs.id!,
    children: [],
  }));

  return headingsToc.reduce((acc: Toc[], current: Toc): Toc[] => {
    let array = acc;
    do {
      if (
        array.length === 0 ||
        array[array.length - 1]!.level >= current.level
      ) {
        break;
      }
      array = array[array.length - 1]!.children;
    // eslint-disable-next-line no-constant-condition
    } while (true);

    array.push(current);
    return acc;
  }, []);
}