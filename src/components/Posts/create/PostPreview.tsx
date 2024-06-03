import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./preview.module.css";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { Storage } from "@/app/utils/utilities";

export default function PostPreview() {
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [img, setImg] = React.useState("");

  React.useEffect(() => {
    const content = Storage.getStorageItem("content");
    const postTitle = Storage.getStorageItem("postTitle");
    const postImg = Storage.getStorageItem("img");
    if (content && postTitle && postImg) {
      setValue(content.html);
      setTitle(postTitle.title);
      setImg(postImg.img);
    }
  }, []);
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
