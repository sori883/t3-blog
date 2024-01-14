export function getTwitterXId(url: string): string | null {
  // URLからIDを抽出する正規表現パターン
  const pattern = /\/status\/(\d+)$/;

  // URLにパターンを適用
  const match = url.match(pattern);

  // マッチする場合、IDを返す
  if (match?.[1]) {
    return match[1];
  } else {
    // マッチしない場合はnullを返す
    return null;
  }
}
