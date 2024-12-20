"use client";

import React, {Suspense, useEffect} from "react";
import Image from "next/image";
import styles from "./createpost.module.css";
import AddImageFeature from "../addFeature/AddFeature";
import {slugify, Storage} from "@/app/utils/utilities";
import * as actions from "@/actions";
import {useHandleFile, usePostTitle} from "@/app/hooks";
import {CustomEditor} from "../editors/mdx-editor/editor";
import {MDXEditorMethods} from "@mdxeditor/editor";

export default function CreatePost() {
  const storagePost = Storage.getStorageItem("post") || {};
  const [autoSave, setAutoSave] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const { setFile, media, setMedia } = useHandleFile("");
  const { title, handleTitle } = usePostTitle("");
  const markdown = Storage.getStorageItem('markdown') || `The world is at your **oysters**`
  const ref = React.useRef<MDXEditorMethods>(null)

  const editorMarkdown = ref.current?.getMarkdown() as string;

  const autoCreatePost = React.useCallback(async () => {
    try {
      const data = {
        title,
        postImg: media,
        slug: slugify(title),
        markdown: editorMarkdown,
        content: editorMarkdown,
      };

      const response = await actions.createPost(data);
      if (response?.error) {
        setError(response.error);
      } else {
        setAutoSave(!autoSave);
        Storage.removeFromStorage('markdown')
      }
    } catch (error: any) {
      setError(error);
    }
  }, [title, media, editorMarkdown, autoSave]);

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
        <Suspense fallback={'loading....'}>
        <CustomEditor ref={ref} markdown={markdown}/>
        </Suspense>
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
