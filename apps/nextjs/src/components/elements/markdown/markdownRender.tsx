export function MarkdownRender(props: {
  html: string;
}) {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: props.html }} />
      </div>
    );
}