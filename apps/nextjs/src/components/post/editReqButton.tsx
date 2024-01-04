import type { RouterOutputs } from "~/trpc/shared";
import { IconGithub } from "~/components/elements/icons";
import { Link } from "~/components/elements/link";

export function EditReqButton(props: {
  url: RouterOutputs["post"]["index"]["posts"][number]["githubUrl"];
}) {
  return (
    <Link href={props.url}>
      <button className="ui_btn ui_btn-sm">
        <IconGithub />
        Githubで編集をリクエスト
      </button>
    </Link>
  );
}
