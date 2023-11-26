export const sendDiscord = async (
  hookUrl:string,
  content: string
  ) => {
    await fetch(hookUrl, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({ content })
    })
}