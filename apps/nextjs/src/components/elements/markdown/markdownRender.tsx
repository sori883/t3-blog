import "@acme/markdown/css/index.scss"

export function MarkdownRender(props: {
  html: string;
}) {
    return (
      <div className="znc" dangerouslySetInnerHTML={{ __html: props.html }} />
    );
}