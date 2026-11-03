import React from "react";

export default function ArticleMarkdown({ content }: { content: string }) {
  const lines = content.replace(/\\r\\n/g, "\\n").split("\\n");
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      nodes.push(<ul key={`list-${nodes.length}`} className="my-5 list-disc space-y-2 pl-7">{list.map((item, i) => <li key={i}>{inline(item)}</li>)}</ul>);
      list = [];
    }
  };
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) { flush(); return; }
    if (line.startsWith("### ")) { flush(); nodes.push(<h3 key={i} className="mb-3 mt-7 text-xl font-bold text-[#123b78]">{inline(line.slice(4))}</h3>); }
    else if (line.startsWith("## ")) { flush(); nodes.push(<h2 key={i} className="mb-3 mt-9 text-2xl font-extrabold text-[#123b78]">{inline(line.slice(3))}</h2>); }
    else if (line.startsWith("# ")) { flush(); nodes.push(<h2 key={i} className="mb-3 mt-9 text-2xl font-extrabold text-[#123b78]">{inline(line.slice(2))}</h2>); }
    else if (/^[-*] /.test(line)) list.push(line.slice(2));
    else if (line.startsWith("> ")) { flush(); nodes.push(<blockquote key={i} className="my-5 border-l-4 border-blue-400 bg-blue-50 px-5 py-3 text-slate-700">{inline(line.slice(2))}</blockquote>); }
    else { flush(); nodes.push(<p key={i} className="my-4">{inline(line)}</p>); }
  });
  flush();
  return <div className="article-content text-[16px] leading-8 text-slate-700">{nodes}</div>;
}
function inline(value: string): React.ReactNode {
  return value.split(/(\\*\\*[^*]+\\*\\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}
