"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./createpost.module.css";
import PostPreview from "./PostPreview";
import AddImageFeature from "../addFeature/AddFeature";
import NovelEditor from "../editors/novel/NovelEditor";
import { JSONContent } from "novel";
import { Storage, slugify } from "@/app/utils/utilities";
import * as actions from "@/actions";

export default function CreatePost() {
  const storagePost = Storage.getStorageItem("post") || {};
  const [value, setValue] = React.useState<null | JSONContent>(null);
  const [title, setTitle] = React.useState(storagePost?.title || "");
  const [media, setMedia] = React.useState(storagePost?.img || "");
  const [file, setFile] = React.useState(null);
  const [openPreview, setOpenPreview] = React.useState(false);
  const [htmlValue, setHtmlValue] = React.useState(
    storagePost?.content?.html || "",
  );
  const [autoSave, setAutoSave] = React.useState(false);

  const router = useRouter();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          setMedia(reader.result as string);
          const updatedPost = { ...storagePost, img: reader.result as string };
          Storage.setToStorage("post", updatedPost);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    const updatedPost = { ...storagePost, title: e.target.value };
    Storage.setToStorage("post", updatedPost);
  };

  const handlePublish = async () => {
    const data = {
      title,
      desc: htmlValue,
      rawPost: value,
      img: media,
      slug: slugify(title),
      catSlug: "coding",
    };
    const res = await fetch("/api/v1/posts", {
      method: "UPDATE",
      body: JSON.stringify({
        ...data,
        published: true,
        updatedAt: new Date(),
      }),
    });
    if (res.ok) {
      router.push(`/posts/${data.slug}`);
      Storage.clearStorage();
    }
  };

  const handleAutoSave = React.useCallback(async () => {
    if (value && title) {
      try {
        const data = {
          title,
          desc: htmlValue,
          rawPost: value,
          img: media,
          slug: slugify(title),
          catSlug: "coding",
        };

        const response = await actions.autoSavePost(data);
        if (response.success) {
          setAutoSave(!autoSave);
          setTimeout(() => {
            setAutoSave(!autoSave);
          }, 3000);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("An error occurred during saving post:", error);
      }
    }
  }, [value, title, htmlValue, media, autoSave]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await handleAutoSave();
    }, 300000);
    return () => clearInterval(interval);
  }, [handleAutoSave]);

  useEffect(() => {
    const clearStorageItems = () => {
      // Storage.removeFromStorage("postTitle");
      console.log("clearing storage items");
    };

    window.addEventListener("beforeunload", clearStorageItems);

    return () => {
      window.removeEventListener("beforeunload", clearStorageItems);
    };
  }, []);

  const handlePreview = () => {
    setOpenPreview(!openPreview);
  };

  return (
    <div className={`${styles.container} relative`}>
      {autoSave && (
        <p className="absolute top-0 left-96 w-max mx-auto text-base text-softText">
          Saving....
        </p>
      )}
      {openPreview && <PostPreview />}
      {!openPreview && (
        <React.Fragment>
          <label className="w-full flex gap-2 items-center">
            <textarea
              name="title"
              placeholder="Post title"
              className={styles.input}
              onChange={(e) => handleTitle(e)}
              defaultValue={title}
            />
          </label>
          {media && (
            <div className={styles.postImage}>
              <Image src={media} alt="image" fill />
              <button
                onClick={() => {
                  setMedia("");
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded-md absolute top-0 right-0"
              >
                Change image
              </button>
            </div>
          )}

          {!media && <AddImageFeature setFile={setFile} styles={styles} />}
          <NovelEditor value={value} setValue={setValue} html={setHtmlValue} />
        </React.Fragment>
      )}
      <div className="flex gap-4 mt-5">
        <button
          type="button"
          className={styles.preview}
          onClick={handlePreview}
        >
          {openPreview ? "Continue editing" : "Preview"}
        </button>
        <button
          type="button"
          className={styles.publish}
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
