import { api } from "~/utils/server";
import { notFound } from 'next/navigation'
import { Image } from "~/components/elements/image"
import { formatDate } from "~/utils/formatDate"

export async function PostContent(props: {
  slug: string
}) {
  const post = await api.post.findBySlug.query({slug: props.slug});

  // 存在しない場合は404にしておく
  if (post === undefined) {
    notFound()
  }

  const lastUpdate = post.updatedAt ?? post.createdAt

  return (
    <div>
        <div className="border-b-2 pb-5">
          <h1 className="text-4xl font-medium mb-3">{post.title}</h1>
          <div className="ui_badge ui_badge-outline mb-1">{post.category.title}</div>
          <p>最終更新日：{formatDate(lastUpdate)}</p>
        </div>
      <figure className="relative w-full h-80 mb-5">
        <Image src={post.thumbnailUrl} alt="アイキャッチ" />
      </figure>
      <article className="prose lg:prose-xl">
        {post.entry}
        {`
        ここ1年ほどクレカの決済修行も兼ねた高還元ルートによるポイ活()にお世話になっていましたが、ただお金を払って何円使ったかを管理するだけの作業が煩雑化したのでやめました。

        この記事はしょうもないただのポエムなので、自分で用意したこのインターネットゴミ箱に捨てて置くことにします。
        
        ## 高還元だからめんどくさい
        
        高還元決済ルートとはクレカから支払いまでに複数の決済サービス(プリペイドカード等)を経由することによるポイントの多重取りで高還元を実現することであり、その性質上、基本的に高還元であるほど経由するサービスは多くなります。
        
        例えば以下は私が実際に使っていた5つのサービスを経由し還元率4.5%の得る決済ルートです。
        
        1. JQエポスゴールド
        2. MIXIM(2.5%)
        3. FamiPay(3%)
        4. ANA Pay(3.5%)
        5. TOYOTA Wallet(4.5%)
        6. モバイルSuica(4.5%～)
        7. 買い物
        
        これを実際に運用していくとめちゃくちゃ家計管理がめんどくさい。
        
        - 金が各サービスに散乱する
            - 最高還元率のモバイルSuica残高
            - モバイルSuicaが使えない時用のTOYOTA Wallet残高
            - リアルカードが必要な時ようのMIXIM残高
        - 家計簿アプリと連携出来ないサービスが多い
            - 上記の中で自動かつ快適に連携出来るのはMIXIMだけ
        - ポイントが各サービスに散乱する
        - チャージがめんどくさい
        
        また、経由されているだけのサービスがそれを良しとするはずもなく、数ヶ月～早ければ数週間でチャージ不可、ポイント付与対象外となるケースが多く、基本的に経由するサービスが多い=高還元=短寿命の傾向があります。
        もちろん、上記の決済ルートも既に寿命を迎えてます。
        
        そんなことが数ヶ月のサイクルで発生するため、決済ルートの再構築、Twitterで情報収集、各サービスの残高とポイントの消化と、決済ルートの管理までめんどくさい。
        
        ## めんどくさいと続かない
        
        最初の頃は楽しかったです。
        試行錯誤しながら決済ルートを考えて毎月貯まっていくポイントを眺めるだけで酒が飲めました。
        もちろん長年連れ添ってきた家計簿アプリMoneyForwardに連携出来なくとも手動でチマチマ支出を入力していました。
        
        しかし、1ヶ月も経つとモチベーションも失われ、正直どのくらい使ったのか分からない、週末に家計簿で計算するがどう頑張っても金額が合わず。
        はっきりと分かるのは獲得ポイント数だけで、一体いくら使ってこのポイントを稼いだのかすらも分からない。
        
        そんな時にJQエポスゴールドの選べるポイントアップショップに[改定](https://www.eposcard.co.jp/news/pointupshop230731.html?webview=false)が行われこともあり、目先のポイント以上の管理工数に加え、各種サービスに迷惑を掛け周り巡って自分の首を締めているだけな気がしてやめました。
        
        ## 決済はストレスフリーのほうがいい
        
        別に決済だけじゃないですが、日常的に行う行為はストレスフリーの方がいいです。
        それが手段なのであればなおさらです。
        そもそも私がキャッシュレス決済オンリーにしたのは手動で家計簿をつけるストレスを解消するためでした。
        
        ## さいごに
        
        良くも悪くもこの1年を通して私のクレカ論が大きく変わりました。
        決済ルートの部品としてクレカを選ぶのでなく、決済の手段として年会費、還元率、特典のバランスの取れた長く使えるクレカを持つのが一番だと思い、今はそうしています。
        
        何が合うかは人それぞれですが、クレカは決済の道具であり、決済は手段です。
        道具に振り回されることなくストレスなく使うことが出来るというのが大事だと再認識しました。
        
        ぴえん        
        `}
      </article>
    </div>
  );
}