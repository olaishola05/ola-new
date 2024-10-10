"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Storage, slugify } from "@/app/utils/utilities";
import * as actions from "@/actions";
import Image from "next/image";
import styles from "../create/createpost.module.css";
import AddImageFeature from "../addFeature/AddFeature";
import { useHandleFile, usePostTitle } from "@/app/hooks";
import CustomEditor from "../editors/block-note-editor/Editor";
import { PartialBlock } from "@blocknote/core";
import SearchTagsModal from "./desc-modal";

export default function PostEdit({ post }: { post: any }) {
  const storagePost = Storage.getStorageItem("post") || {};
  const [openPreview, setOpenPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const { title, handleTitle } = usePostTitle(post?.title);
  const { setFile, media, setMedia } = useHandleFile(post?.postImg);
  const [markdown, setMarkdown] = useState("")
  const [openDescModal, setOpenDescModal] = useState<boolean>(false)
  const [initialContent, setInitialContent] = useState<
    PartialBlock[]
  >(post?.content);

  const publishPost = async () => {
    setOpenDescModal(!openDescModal)
  };

  const modalData = {
    title,
    postImg: media,
    slug: slugify(title),
    markdown,
    desc: post?.desc,
    id: post?.id
  };

  const handleAutoSave = useCallback(async () => {
    if (title) {
      setIsSaving(true);
      try {
        const data = {
          title,
          postImg: media,
          content: initialContent,
          markdown,
          published: post?.published,
          publishedDate: post?.publishedDate,
          slug: slugify(title),
          id: post?.id
        };
        const response = await actions.autoSavePost(data);
        if (!response.success) {
          setError(response.error!);
        }
      } catch (error: any) {
        setError(error.message || "An error occurred during auto-save");
      } finally {
        setIsSaving(false);
        setError("");
      }
    }
  }, [title, media, initialContent, markdown, post?.published, post?.publishedDate, post?.id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await handleAutoSave();
    }, 180000); //3 mins
    return () => clearInterval(interval);
  }, [handleAutoSave]);

  useEffect(() => {
    const syncWithStorage = () => {
      const postInStorage = Storage.getStorageItem("post");
      if (postInStorage) {
        handleTitle({ target: { value: postInStorage.title } } as any);
        setMedia(postInStorage.img);
      }
    };
    syncWithStorage();
  }, [handleTitle, setMedia]);

  const handlePreview = () => {
    setOpenPreview(!openPreview);
  };

  return (
    <div className={`${styles.container} relative`}>
      <SearchTagsModal open={openDescModal} closeModal={setOpenDescModal} data={modalData} />
      {error && <p>{error}</p>}
      {isSaving && !error && (
        <p className="absolute top-0 left-96 w-max mx-auto text-base text-softText">
          Saving....
        </p>
      )}
      <>
        <label className="w-full flex gap-2 items-center">
          <textarea
            name="title"
            placeholder="Post title"
            className={styles.input}
            onChange={(e) => handleTitle(e)}
            defaultValue={title}
            disabled={openPreview}
          />
        </label>
        {media && (
          <div className={styles.postImage}>
            <Image src={media} alt="image" fill />
            {!openPreview && <button
              onClick={() => {
                setMedia("");
                const updatedPost = { ...storagePost, img: "" };
                Storage.setToStorage("post", updatedPost);
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded-md absolute top-0 right-0"
            >
              Change image
            </button>}
          </div>
        )}

        {!media && <AddImageFeature setFile={setFile} styles={styles} />}
        <CustomEditor
          initialContent={initialContent}
          setInitialContent={setInitialContent}
          setMarkdown={setMarkdown}
        />
      </>
      <div className="flex gap-4 absolute top-0 -right-40">
        <button
          type="button"
          className={styles.preview}
          onClick={handlePreview}
        >
          {openPreview ? "Edit" : "Preview"}
        </button>
        <button type="button" className={styles.publish} onClick={publishPost}>
          {post?.published ? 'Republish' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
