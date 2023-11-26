import { ContactForm } from "~/components/contact";

export default function Contact() {
  return (
    <article className="prose w-full max-w-full">
      <h1>お問い合わせ</h1>
      <div className="ui_divider" />
      <p>
        このフォームでは、ご意見、ミスリンク・デッドリンクのご指摘、コンテンツのご指摘などのフィードバックを受付けております。
      </p>
      <ul>
        <li>
          お寄せいただきましたご要望やご質問などは、コミュニケーションのために活用させていただくもので、それ以外の目的で使用することはございません。
        </li>
        <li>
          内容または代表者の都合などにより、回答にお時間をいただいたり、回答そのものを控えさせていただくことがございます。
        </li>
        <li>
          ご記入いただいた内容やメールアドレスの管理は適正に行い、回答目的以外には使用いたしません。
        </li>
        <li>
          *マークがついている項目は必須項目です。
        </li>
        <li>
          個人及び団体などを誹謗中傷する内容や営業、宣伝などは固くお断りいたします。
        </li>
      </ul>
      <ContactForm />
    </article>
  );
}
