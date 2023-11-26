"use client"

import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError, FormSuccess } from "~/components/elements/alert";
import { Button } from "~/components/elements/button";
import { sendContactAction } from "~/actions/contact";

export const InputsSchema = z.object({
  email: z.string()
  .nonempty("メールアドレスを入力してください")
  .email("メールアドレスを入力してください"),
  body: z.string()
  .nonempty("お問い合わせ内容を入力してください")
  .min(10, "10文字以上で入力してください"),
})
.required()

export type Inputs = z.infer<typeof InputsSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm<Inputs>({
    resolver: zodResolver(InputsSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await sendContactAction(data)
    reset()
  }

  return (
    <div>
      <form
        className="flex w-full max-w-2xl flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
      <label htmlFor="email">メールアドレス*</label>
      <input
        id="email"
        className={`mb-2 rounded bg-white/10 p-2 border-2 ${errors.email && "border-red-600"}`}
        placeholder="contactMail@sori883.com"
        {...register("email")}
      />
      {errors.email?.message && <FormError className="mb-5">{errors.email.message}</FormError>}
    <label htmlFor="body">お問い合わせ内容*</label>
    <textarea
        id="body"
        className={`mb-2 rounded bg-white/10 p-2 border-2 ${errors.body && "border-red-600"}`}
        rows={5}
        placeholder="お問い合わせ内容"
        {...register("body")}
      />
      {errors.body?.message && <FormError className="mb-5">{errors.body.message}</FormError>}
      <Button
        type="submit"
        className="ui_btn"
        disabled={isSubmitting}
      >
        お問い合わせを送信する
      </Button>
      {
        isSubmitSuccessful && 
        <FormSuccess
          className="mt-5 p-3"
        >
          お問い合わせありがとうございました。
        </FormSuccess>
      }
      </form>
    </div>
  );
}