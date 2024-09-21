"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./createpost.module.css";
import AddImageFeature from "../addFeature/AddFeature";
import { Storage, slugify } from "@/app/utils/utilities";
import * as actions from "@/actions";
import { useHandleFile, usePostTitle, useNavigation } from "@/app/hooks";
import CustomEditor from "../editors/block-note-editor/Editor";
import { PartialBlock } from "@blocknote/core";

export default function CreatePost() {
  const storagePost = Storage.getStorageItem("post") || {};
  const [autoSave, setAutoSave] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const { setFile, media, setMedia } = useHandleFile("");
  const { title, handleTitle } = usePostTitle("");
  const [markdown, setMarkdown] = React.useState("")
  const { navigate } = useNavigation();

  const [initialContent, setInitialContent] = React.useState<
    PartialBlock[] | undefined | "loading"
  >(undefined);

  const autoCreatePost = React.useCallback(async () => {
    try {
      const data = {
        title,
        postImg: media,
        slug: slugify(title),
        markdown
      };

      const response = await actions.createPost(data);
      if (response?.success) {
        setAutoSave(!autoSave);
        Storage.removeFromStorage('post')
        navigate(`/blog/${response.postId}/edit`);
      } else {
        setError(response.error);
      }
    } catch (error: any) {
      setError(error);
    }
  }, [title, media, markdown, autoSave, navigate]);

  useEffect(() => {
    const interval = setTimeout(async () => {
      if (!title) return
      await autoCreatePost();
      setAutoSave(!autoSave);
      setError("");
    }, 30000);
    return () => clearTimeout(interval);
  }, [autoCreatePost, autoSave, title]);

  return (
    <div className={`${styles.container} relative`}>
      {autoSave && !error && (
        <p className="absolute top-0 left-96 w-max mx-auto text-base text-softText">
          Saving....
        </p>
      )}
      {error && (
        <p className="absolute top-0 left-96 w-max mx-auto text-lg text-red-700">
          {error}
        </p>
      )}
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
                const updatedPost = { ...storagePost, img: "" };
                Storage.setToStorage("post", updatedPost);
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded-md absolute top-0 right-0"
            >
              Change image
            </button>
          </div>
        )}

        {!media && <AddImageFeature setFile={setFile} styles={styles} />}
        <CustomEditor initialContent={initialContent} setInitialContent={setInitialContent} setMarkdown={setMarkdown} />
      </React.Fragment>
      <div className="flex gap-4 mt-0 absolute top-0 -right-20">
        <button
          type="button"
          className={styles.publish}
          disabled={!title}
          style={{ opacity: !title ? 0.5 : 1, cursor: !title ? "none" : 'pointer' }}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
