/**
 * forked from https://github.com/zenn-dev/zenn-editor
 */
import type { EmbedGeneratorList } from './embed';

/**
 * Markdown 変換時のオプション型
 */
export interface MarkdownOptions {
  embedOrigin?: string;
  customEmbed?: Partial<EmbedGeneratorList>;
}