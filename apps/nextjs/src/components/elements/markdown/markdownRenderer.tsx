import { markdownToHtml } from "~/markdown"


export function MarkdownRenderer(props: {
  text: string;
}) {
  const html = markdownToHtml(props.text)
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

    );
}