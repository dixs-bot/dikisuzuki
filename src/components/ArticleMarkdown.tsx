import React from "react";

type Block =
  | { type: "paragraph"; text: string; key: number }
  | { type: "heading"; level: 2 | 3 | 4; text: string; key: number }
  | { type: "list"; ordered: boolean; items: string[]; key: number }
  | { type: "quote"; text: string; key: number };

export default function ArticleMarkdown({ content }: { content: string }) {
  // Normalize real line breaks and common escaped-newline content from older imports.
  const normalized = content
    .replace(/\r\n?/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .trim();

  const lines = normalized.split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;
  let listKey = 0;

  const flushParagraph = () => {
    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", text, key: blocks.length });
    paragraph = [];
  };
  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "list", ordered: listOrdered, items: [...listItems], key: blocks.length });
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushParagraph(); flushList(); continue; }

    // Markdown heading. Handle heading markers even if pasted directly after a sentence.
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph(); flushList();
      const level = Math.min(4, Math.max(2, headingMatch[1].length)) as 2 | 3 | 4;
      blocks.push({ type: "heading", level, text: headingMatch[2].trim(), key: blocks.length });
      continue;
    }

    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    const bullet = line.match(/^[-*+]\s+(.+)$/);
    if (numbered || bullet) {
      flushParagraph();
      const ordered = Boolean(numbered);
      if (listItems.length && listOrdered !== ordered) flushList();
      listOrdered = ordered;
      listItems.push((numbered || bullet)![1]);
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph(); flushList();
      blocks.push({ type: "quote", text: line.slice(2), key: blocks.length });
      continue;
    }

    // Remove accidental heading markers embedded in legacy flattened content.
    const cleaned = line
      .replace(/\s+#{1,6}\s+(?=\d+[.)]?\s)/g, "\n")
      .replace(/(?<!^)\s+(#{2,6})\s+(?=[A-Z0-9])/g, "\n$1 ");
    const pieces = cleaned.split("\n").map((x) => x.trim()).filter(Boolean);
    for (const piece of pieces) {
      const embeddedHeading = piece.match(/^(#{1,6})\s+(.+)$/);
      if (embeddedHeading) {
        flushParagraph(); flushList();
        const level = Math.min(4, Math.max(2, embeddedHeading[1].length)) as 2 | 3 | 4;
        blocks.push({ type: "heading", level, text: embeddedHeading[2], key: blocks.length });
      } else {
        paragraph.push(piece);
      }
    }
  }
  flushParagraph(); flushList();

  return (
    <div className="article-content mx-auto max-w-none text-[16px] leading-[1.9] text-slate-700 sm:text-[17px]">
      {blocks.map((block) => {
        if (block.type === "heading") {
          const className = block.level === 2
            ? "mb-4 mt-10 border-b border-slate-100 pb-3 text-2xl font-extrabold leading-snug tracking-tight text-[#123b78] sm:text-3xl"
            : block.level === 3
              ? "mb-3 mt-8 text-xl font-bold leading-snug text-[#164b91]"
              : "mb-2 mt-6 text-lg font-bold leading-snug text-[#164b91]";
          if (block.level === 2) return <h2 key={block.key} className={className}>{inline(block.text)}</h2>;
          if (block.level === 3) return <h3 key={block.key} className={className}>{inline(block.text)}</h3>;
          return <h4 key={block.key} className={className}>{inline(block.text)}</h4>;
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return <Tag key={block.key} className={`my-5 space-y-2 pl-7 marker:font-semibold marker:text-blue-600 ${block.ordered ? "list-decimal" : "list-disc"}`}>
            {block.items.map((item, i) => <li key={i} className="pl-1">{inline(item)}</li>)}
          </Tag>;
        }
        if (block.type === "quote") return <blockquote key={block.key} className="my-7 rounded-r-xl border-l-4 border-blue-500 bg-blue-50/70 px-5 py-4 text-slate-700">{inline(block.text)}</blockquote>;
        return <p key={block.key} className="my-5">{inline(block.text)}</p>;
      })}
    </div>
  );
}

function inline(value: string): React.ReactNode {
  // Support bold, italic and inline code without rendering Markdown syntax literally.
  const tokens = value.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return tokens.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-blue-800">{part.slice(1, -1)}</code>;
    return part;
  });
}
