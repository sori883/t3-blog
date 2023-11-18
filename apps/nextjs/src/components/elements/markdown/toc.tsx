import { parseToc } from "~/markdown/utils"

export function Toc(props: {
  html: string;
}) {
  const toc = parseToc(props.html)
    return (
      <div>
        {
          toc.map((p) => (<p key={p.id}>{p.text}:→{p.level}</p>))
        }
      </div>

    );
}