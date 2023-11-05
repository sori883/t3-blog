import type { RouterOutputs } from "~/utils/shared";
import { formatDate } from "~/utils/formatDate"
import { Image } from "~/components/elements/image";

export function PostCard(props: {
  post: RouterOutputs["post"]["index"][number];
}) {
  return (
    <div className="ui_card w-96 bg-white shadow-xl">
      <figure className="relative w-96 h-48"><Image src={props.post.thumbnailUrl} alt="icon" /></figure>
      <div className="ui_card-body">
        <h2 className="ui_card-title">
          {props.post.title}
        </h2>
        <p>{formatDate(props.post.createdAt)}</p>
        <div className="ui_card-actions justify-end">
          {
            props.post.category ? 
            <div className="ui_badge ui_badge-outline">{props.post.category.title}</div> 
            :
            <div className="ui_badge ui_badge-outline">未分類</div> 
          }
        </div>
      </div>
    </div>
  );
}