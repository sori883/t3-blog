import { markdownToHtml } from "~/components/elements/markdown"


export function MarkdownRenderer(props: {
  text: string;
}) {
  const html = markdownToHtml(props.text)
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}