export function getExtension(filename: string): string {
  // 最後のピリオドの位置を探す
  const lastIndex = filename.lastIndexOf(".");

  // ピリオドが見つからないか、ファイル名の最後にある場合は、拡張子なしとみなす
  if (lastIndex === -1 || lastIndex === filename.length - 1) {
      return "";
  }

  // ピリオドの後の文字列（拡張子）を返す
  return filename.substring(lastIndex + 1);
}
