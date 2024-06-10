import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./preview.module.css";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { Storage } from "@/app/utils/utilities";

export default function PostPreview() {
  const [value, _setValue] = React.useState(
    Storage.getStorageItem("content").html || "",
  );
  const [title, _setTitle] = React.useState(
    Storage.getStorageItem("postTitle").title || "",
  );
  const [img, _setImg] = React.useState(
    Storage.getStorageItem("postImg").img || "",
  );

  const markdown = NodeHtmlMarkdown.translate(value);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {img && (
        <div className={styles.image}>
          <Image src={img} alt="article image" fill />
        </div>
      )}
      <div className={styles.previews}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
