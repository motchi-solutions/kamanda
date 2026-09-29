"use client";

import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  Extension,
  InputRule,
  mergeAttributes,
  type JSONContent,
} from "@tiptap/core";
import { DOMParser as ProseMirrorDOMParser } from "@tiptap/pm/model";
import { Plugin } from "@tiptap/pm/state";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { messageHtml } from "@/lib/contact/message-format";

function serialize(node: JSONContent): string {
  if (node.type === "text") {
    const link = node.marks?.find((mark) => mark.type === "link");
    return link
      ? `[${node.text ?? ""}](${link.attrs?.href})`
      : (node.text ?? "");
  }
  if (node.type === "hardBreak") return "\n";
  const children = node.content ?? [];
  if (node.type === "bulletList")
    return children.map((item) => `- ${serialize(item)}`).join("\n");
  return children
    .map(serialize)
    .join(node.type === "doc" || node.type === "listItem" ? "\n" : "");
}

const MessageLink = Link.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        title: `${HTMLAttributes.href} (opens in a new tab)`,
        target: "_blank",
        rel: "noopener noreferrer",
        tabindex: "0",
      }),
      0,
    ];
  },
  addInputRules() {
    return [
      new InputRule({
        find: /\[([^\]\n]+)\]\((https?:\/\/[^\s()]+)\)$/,
        handler: ({ state, range, match }) => {
          try {
            const url = new URL(match[2]);
            if (url.username || url.password) return null;
            const mark = this.type.create({ href: url.href });
            state.tr.replaceWith(
              range.from,
              range.to,
              state.schema.text(match[1], [mark]),
            );
            state.tr.removeStoredMark(this.type);
          } catch {
            return null;
          }
        },
      }),
    ];
  },
});

const MessageLimit = Extension.create({
  name: "messageLimit",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        filterTransaction: (transaction, state) => {
          if (!transaction.docChanged) return true;
          const length = serialize(transaction.doc.toJSON()).length;
          return (
            length <= 4000 || length < serialize(state.doc.toJSON()).length
          );
        },
      }),
    ];
  },
});

export function MessageEditor({
  value,
  disabled,
  invalid,
  onChange,
  onBlur,
}: {
  value: string;
  disabled: boolean;
  invalid: boolean;
  onChange: (message: string) => void;
  onBlur: () => void;
}) {
  const field = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        strike: false,
        code: false,
        codeBlock: false,
        heading: false,
        blockquote: false,
        horizontalRule: false,
        orderedList: false,
        link: false,
        underline: false,
      }),
      MessageLink.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        defaultProtocol: "https",
        shouldAutoLink: (value) => {
          try {
            const url = new URL(value);
            return (
              ["https:", "http:"].includes(url.protocol) &&
              !url.username &&
              !url.password
            );
          } catch {
            return false;
          }
        },
      }),
      Placeholder.configure({
        placeholder:
          "Tell us about your enquiry:\n• Your goals and the support you need\n• Your timeline\n\nFormatting options:\n• Bullets: type - then a space\n• Links: paste a web address or use [link text](https://example.com)",
      }),
      MessageLimit,
    ],
    content: "",
    editorProps: {
      attributes: {
        id: "message",
        role: "textbox",
        "aria-multiline": "true",
        "aria-required": "true",
        "aria-labelledby": "message-label",
        "aria-describedby": "message-help message-count message-error",
        class: "form-control message-editor",
      },
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData("text/plain");
        if (!text) return false;
        event.preventDefault();
        // Only the same escaped links/bullets supported by our email renderer are accepted.
        const container = document.createElement("div");
        container.innerHTML = messageHtml(text);
        const slice = ProseMirrorDOMParser.fromSchema(
          view.state.schema,
        ).parseSlice(container);
        view.dispatch(view.state.tr.replaceSelection(slice).scrollIntoView());
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      const next = serialize(editor.getJSON());
      if (field.current) field.current.value = next;
      onChange(next);
    },
    onBlur,
  });
  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);
  useEffect(() => {
    editor?.view.dom.setAttribute("aria-invalid", String(invalid));
  }, [editor, invalid]);
  return (
    <>
      <input ref={field} type="hidden" name="message" value={value} readOnly />
      <EditorContent editor={editor} className="min-h-40" />
    </>
  );
}
