const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
// Deliberately small Markdown subset; submitted HTML is always escaped.
export function messageHtml(message: string): string {
  const inline = (text: string) => {
    const links = /\[([^\]\n]+)\]\((https?:\/\/[^\s()]+)\)|(https?:\/\/[^\s<>]+)/g;
    let result = "";
    let offset = 0;
    for (const match of text.matchAll(links)) {
      result += escape(text.slice(offset, match.index));
      const address = match[2] ?? match[3].replace(/[.,!?;:)\]]+$/, "");
      const label = match[1] ?? address;
      const trailing = match[3] ? match[3].slice(address.length) : "";
      try {
        const url = new URL(address);
        if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error();
        result += `<a href="${escape(url.href)}" target="_blank" rel="noopener noreferrer" title="${escape(url.href)}" style="color:#1b3a66;text-decoration:underline">${escape(label)}</a>${escape(trailing)}`;
      } catch { result += escape(match[0]); }
      offset = match.index + match[0].length;
    }
    return result + escape(text.slice(offset));
  };
  const blocks: string[] = [];
  let items: string[] = [];
  const flushList = () => {
    if (items.length) blocks.push(`<ul style="margin:8px 0;padding-left:24px;list-style-type:disc">${items.join("")}</ul>`);
    items = [];
  };
  for (const line of message.split(/\r?\n/)) {
    const bullet = /^\s*[-*•]\s+(.+)$/.exec(line);
    if (bullet) items.push(`<li style="margin:4px 0">${inline(bullet[1])}</li>`);
    else {
      flushList();
      blocks.push(line.trim() ? `<div>${inline(line)}</div>` : "<br>");
    }
  }
  flushList();
  return blocks.join("");
}

