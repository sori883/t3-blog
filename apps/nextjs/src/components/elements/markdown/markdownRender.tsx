import "@acme/markdown/css";

export function MarkdownRender(props: { html: string }) {
  return (
    <div className="znc" dangerouslySetInnerHTML={{ __html: props.html }} />
  );
}
