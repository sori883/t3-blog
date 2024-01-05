import { env } from "~/env";

interface MakeUrlProps {
  url: string;
  text: string;
}

const baseUrl = `https://${env.NEXT_PUBLIC_APP_URL}/`;

export const makeXTwitterUrl = ({ url, text }: MakeUrlProps): string =>
  `http://twitter.com/share?url=${baseUrl}${url}&text=${text}`;

export const makeFacebookUrl = (url: MakeUrlProps["url"]): string =>
  `https://www.facebook.com/share.php?u=${baseUrl}${url}`;

export const makeLineUrl = (url: MakeUrlProps["url"]): string =>
  `https://social-plugins.line.me/lineit/share?url=${baseUrl}${url}`;
