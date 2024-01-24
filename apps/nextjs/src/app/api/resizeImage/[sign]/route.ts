import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sharp from "sharp";

import { generateResizeImageWord, verifySignature } from "~/utils/signature";

function setCorsHeaders(res: Response) {
  res.headers.set("Cache-Control", "maxage=86400");
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sign: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("url");
  const width = searchParams.get("width");

  // パラメータが設定されているか確認する
  if (!params.sign || !imageUrl || !width)
    return NextResponse.json(
      { error: "パラメータが不足しています。" },
      { status: 400 },
    );

  // 署名を検証する
  const queryParams = generateResizeImageWord(imageUrl, width);
  if (!verifySignature(queryParams, params.sign)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 画像を取得する
  const response = await fetch(imageUrl);
  if (!response.ok) {
    return NextResponse.json(
      { error: `画像を取得できませんでした。: ${response.statusText}` },
      { status: 500 },
    );
  }

  try {
    // 画像をリサイズして返す
    const buffer = await response.arrayBuffer();
    const resizedImage = await sharp(Buffer.from(buffer))
      .resize(Number(width), null) // 指定した横幅でリサイズし、高さはアスペクト比を保って自動調整
      .toBuffer();

    return setCorsHeaders(
      new NextResponse(resizedImage, {
        status: 200,
        headers: {
          "Content-Type": "image/webp",
          "Content-Length": resizedImage.length.toString(),
        },
      }),
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
