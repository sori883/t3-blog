import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPageOGPMetadata } from "metagros/move/cometPunch";

export { type Metadata } from "metagros/move/cometPunch";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url)
    return NextResponse.json({ error: "url undefined" }, { status: 500 });

  const ogp = await getPageOGPMetadata(url);
  return NextResponse.json(ogp);
}
