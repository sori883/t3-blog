import type { Probot } from "probot";
import axios from "axios";
import { loadFront } from "yaml-front-matter";

import type { PostMeta } from "./types";
import { isAllowedImage } from "./utils/isAllowedImage";
import { uploader } from "./utils/uploader";

const app = (app: Probot) => {
  app.on("push", async (context) => {
    // コミット情報を取得する
    const owner = context.payload.repository.owner.name;
    const repo = context.payload.repository.name;
    const commits = context.payload.commits;

    // 追加と変更があったコミットを取得する
    const addFilePaths = commits.map((item) => item.added).flat();
    const modFilePaths = commits.map((item) => item.modified).flat();

    // 画像ファイルを取得
    // 追加
    const tmpImagelistAdds = [...addFilePaths].filter(
      (item) =>
        item.split(".").pop() !== "md" &&
        isAllowedImage(String(item.split(".").pop())),
    );
    const imagelistAdds = tmpImagelistAdds.filter((item) =>
      item.startsWith("images/"),
    );
    // 更新
    const tmpImagelistMods = [...modFilePaths].filter(
      (item) =>
        item.split(".").pop() !== "md" &&
        isAllowedImage(String(item.split(".").pop())),
    );
    const imagelistMods = tmpImagelistMods.filter((item) =>
      item.startsWith("images/"),
    );

    // 追加の画像を取得する
    const imagesAdds = await Promise.all(
      imagelistAdds.map(async (item) => {
        return await context.octokit.repos
          .getContent({
            owner: String(owner),
            repo: repo,
            path: item,
            headers: {
              accept: "application/vnd.github+json",
            },
          })
          .then(({ data }) => data);
      }),
    );

    // 追加:画像アップロード
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imagesAdds.map(async (item: any) => {
      // eslint-disable-next-line
      const image = await axios.get(item.download_url, {
        responseType: "arraybuffer",
      });

      (async () => {
        // eslint-disable-next-line
        await uploader(image, item.path);

        // eslint-disable-next-line @typescript-eslint/require-await
      })().catch(async (e) => {
        // eslint-disable-next-line
        console.log(e.code, e.errors);
      });
    });

    // 更新の画像を取得する
    const imagesMods = await Promise.all(
      imagelistMods.map(async (item) => {
        return await context.octokit.repos
          .getContent({
            owner: String(owner),
            repo: repo,
            path: item,
            headers: {
              accept: "application/vnd.github+json",
            },
          })
          .then(({ data }) => data);
      }),
    );

    // 更新:画像アップロード
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imagesMods.map(async (item: any) => {
      // eslint-disable-next-line
      const image = await axios.get(item.download_url, {
        responseType: "arraybuffer",
      });

      (async () => {
        // eslint-disable-next-line
        await uploader(image, item.path);

        // eslint-disable-next-line @typescript-eslint/require-await
      })().catch(async (e) => {
        // eslint-disable-next-line
        console.log(e.code, e.errors);
      });
    });

    // markdownファイルを取得
    // 追加
    const tmpMdlistAdds = [...addFilePaths].filter(
      (item) => item.split(".").pop() === "md",
    );
    const mdlistAdds = tmpMdlistAdds.filter((item) =>
      item.startsWith("articles/"),
    );

    // 記事を取得
    const articleAdds = await Promise.all(
      mdlistAdds.map(async (item) => {
        return await context.octokit.repos
          .getContent({
            owner: String(owner),
            repo: repo,
            path: item,
            headers: {
              accept: "application/vnd.github+json",
            },
          })
          .then(({ data }) => data);
      }),
    );

    // 登録部分
    // eslint-disable-next-line
    articleAdds.map(async (item: any) => {
      // eslint-disable-next-line
      const md = Buffer.from(item.content, "base64").toString();
      const mdMeta = loadFront(md, {
        contentKeyName: "entry",
      }) as unknown as PostMeta;

      const res = await axios.post(process.env.MAKEPOST_ENDPOINT!, {
        title: mdMeta.title,
        slug: mdMeta.slug,
        entry: mdMeta.entry,
        isPublish: mdMeta.isPublish,
        description: mdMeta.description,
        thumbnailUrl: mdMeta.thumbnailUrl,
        // eslint-disable-next-line
        githubUrl: `${item.html_url}`,
        categorySlug: mdMeta.categorySlug,
        tagSlug: mdMeta.tagSlug,
        userId: process.env.USER_ID,
      });

      console.log(res.data);
    });

    // 更新
    const tmpMdlistMods = [...modFilePaths].filter(
      (item) => item.split(".").pop() === "md",
    );
    const mdlistMods = tmpMdlistMods.filter((item) =>
      item.startsWith("articles/"),
    );

    // 記事を取得
    const articleMods = await Promise.all(
      mdlistMods.map(async (item) => {
        return await context.octokit.repos
          .getContent({
            owner: String(owner),
            repo: repo,
            path: item,
            headers: {
              accept: "application/vnd.github+json",
            },
          })
          .then(({ data }) => data);
      }),
    );

    // 登録部分
    // eslint-disable-next-line
    articleMods.map(async (item: any) => {
      // eslint-disable-next-line
      const md = Buffer.from(item.content, "base64").toString();
      const mdMeta = loadFront(md, {
        contentKeyName: "entry",
      }) as unknown as PostMeta;

      const res = await axios.post(process.env.MAKEPOST_ENDPOINT!, {
        title: mdMeta.title,
        slug: mdMeta.slug,
        entry: mdMeta.entry,
        isPublish: mdMeta.isPublish,
        description: mdMeta.description,
        thumbnailUrl: mdMeta.thumbnailUrl,
        // eslint-disable-next-line
        githubUrl: `${item.html_url}`,
        categorySlug: mdMeta.categorySlug,
        tagSlug: mdMeta.tagSlug,
        userId: process.env.USER_ID,
      });

      console.log(res.data);
    });
  });
};

export default app;
