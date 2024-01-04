import type { Toc } from "@acme/markdown";
import { parseToc } from "@acme/markdown";

export function TocRender(props: { html: string }) {
  const toc = parseToc(props.html);

  const renderList = (tocItems: Toc[]) => {
    return (
      <ol>
        {tocItems.map((toc) => (
          <li key={toc.id}>
            <a
              href={`#${toc.id}`}
              className="a-link inline-flex items-center break-all no-underline"
            >
              {toc.text}
            </a>
            {toc.children.length > 0 && <ul>{renderList(toc.children)}</ul>}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="w-full">
      <ol>{renderList(toc)}</ol>
    </div>
  );
}
