/**
 * forked from https://github.com/zenn-dev/zenn-editor
 */
import type MarkdownIt from "markdown-it";

/**
 * Return case-sensitive matched br tag
 * @param {any} state MarkdownIt state
 * @param {number} start start position at br tag
 * @returns {string | null} br tag (<br> or <br/> or <br />)
 */
// eslint-disable-next-line
function matchBR(state: any, start: number): string | null {
  // eslint-disable-next-line
  const match = state.src.slice(start, start + 6).match(/^<br\s?\/?>/);
  if (match) {
    // eslint-disable-next-line
    return match[0];
  }
  return null;
}

export function mdBr(md: MarkdownIt): void {
  // Tokenize
  md.inline.ruler.before(
    "emphasis",
    "br",
    // eslint-disable-next-line
    function tokenize(state: any, silent): boolean {
      // eslint-disable-next-line
      const max = state.posMax;
      // eslint-disable-next-line
      const start = state.pos;

      // don't run any pairs in validation mode
      if (silent) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const br = matchBR(state, start);
      if (br === null || start + br.length > max) {
        return false;
      }
      // eslint-disable-next-line
      state.scanDelims(state.pos, true);
      // eslint-disable-next-line
      const token = state.push("text", "", 0);
      // eslint-disable-next-line
      token.content = "<br>";
      // eslint-disable-next-line
      state.delimiters.push({
        // eslint-disable-next-line
        marker: token.content,
        jump: 0,
        // eslint-disable-next-line
        token: state.tokens.length - 1,
        // eslint-disable-next-line
        level: state.level,
        end: -1,
        open: true,
        close: true,
      });

      // length is: <br> -> 4, <br/> -> 5, <br /> -> 6
      // eslint-disable-next-line
      state.pos += br.length;

      return true;
    },
  );

  // Walk through delimiter list and replace text tokens with tags
  md.inline.ruler2.before("emphasis", "br", function postProcess(state) {
    let i;
    let delim;
    let token;
    const delimiters = state.delimiters;
    const max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      delim = delimiters[i]!;

      const marker = delim.marker as number | "<br>";

      if (marker === "<br>") {
        token = state.tokens[delim.token]!;
        token.type = "br_openclose";
        token.tag = "br";
        token.nesting = 1;
        token.markup = "<br>";
        token.content = "";
      }
    }

    return true;
  });
}
