import type { RouterOutputs } from "@acme/api";

import {
  IconFacebook,
  IconLine,
  IconXTwitter,
} from "~/components/elements/icons";
import { Link } from "~/components/elements/link";
import {
  makeFacebookUrl,
  makeLineUrl,
  makeXTwitterUrl,
} from "~/components/elements/sns";

export function ShareSns(props: {
  post: RouterOutputs["post"]["index"]["posts"][number];
}) {
  return (
    <div className="flex max-w-[100%] justify-around text-3xl">
      <div className="ui_tooltip" data-tip="X(Twitter )に投稿">
        <Link
          href={makeXTwitterUrl({
            url: `${props.post.categorySlug}/${props.post.slug}`,
            text: props.post.title,
          })}
        >
          <IconXTwitter />
        </Link>
      </div>
      <div className="ui_tooltip" data-tip="Facebookで共有">
        <Link
          href={makeFacebookUrl(
            `${props.post.categorySlug}/${props.post.slug}`,
          )}
        >
          <IconFacebook />
        </Link>
      </div>
      <div className="ui_tooltip" data-tip="LINEで共有">
        <Link
          href={makeLineUrl(`${props.post.categorySlug}/${props.post.slug}`)}
        >
          <IconLine />
        </Link>
      </div>
    </div>
  );
}
