export const test = `
## 技術選定と構成

古来からの言い伝えで雑なアウトプット先としてWordpressブログを使ってましたが、
- 管理画面が使い辛くて記事投稿や管理がめんどくさい
- wordpress独自仕様と戦いながらサイトの体裁を整えるのが辛い
- レンタル鯖高い

あたりの理由からwordpressを脱却してなるべくコストを抑えて、触ってみたかったものを選定作り直しを図りました。  

最終的な技術選定は下記です。  

- Contentful
- Next.js
- GCS
- Cloudflare DNS
- Github Apps

https://twitter.com/AlienCaptured/status/1744971347082854815


構成を図にすると画像の通りです。  

![infra](images/0002/infra.png)

Codegenを体験すると、自分で書いていた時代には戻れなくなっちゃう。  

## ContentfulとGithub Apps
Contentfulにも、Wordpressの様な投稿画面はありますが、
- 記事をGitで管理したい
- 画像はGCSにアップロードしたい
を叶えるべく、特定レポジトリへのPushをトリガーとするGithub Appsを作成することにしました。  

まず、記事(mdファイル)は、Contentfulが用意してくれているコンテンツ管理用の[Content Management API](https://www.contentful.com/developers/docs/references/content-management-api/)を使用してエントリの作成・更新をしています。  

この追加・更新についてはドキュメントではざっくりしか触れられておらず、特にEntryLink(References)がある場合のエントリ作成・更新方法がどこに書いてあるのか一生探しました。  
(読み込みが浅いだけかも...?)  
また、タグ周りでfindOrCreateのような動作が必要になりましたが、それも見つからず(恐らく機能自体ない？)自分で実装することになったので、かなりの時間がかかりました。  

https://daisyui.com/docs/colors/

https://www.youtube.com/watch?v=ReI0eJvTQf8

また、画像配信はGCSを利用しています。  
理由としては、Contentfulで画像をアップロードすると1枚につき、無料枠のレコードが1消費されるからです。  
無料枠が25kもあるので要らない気もしましたが、無料枠を越したときに面倒な移行をやるくらいなら最初からGCSを使ったほうが楽な気がして英断しました。  

## 1ヶ月運用してかかった金
GCSだけの利用で税込み31円でした。  
収益0円の雑記としては許容出来るお値段ですね。  
![月額料金](images/0002/1month_money.png)

## 今後やりたいこと
OW2をやりながらだいぶ急いで作成したので、手直ししたいところがかなりあります。  

- ダークモード対応
- markdownの変換周りで、独自記法を追加したい
- 関連記事の表示
- OGP画像生成
- PageSpeed Insightsの結果を緑色にする
- 日本後、アルファベットともに読みやすいフォントを探したい
- 細かいデザイン修正

他にやりたいこともあるので、ゆっくり余生を過ごすような思いで直して行こうかと思います！
`;
