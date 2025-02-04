"use client";

import React, { useCallback, useEffect, useState } from "react";
import { slugify, Storage } from "@/app/utils/utilities";
import Image from "next/image";
import * as actions from "@/actions";
import styles from "../create/createpost.module.css";
import AddImageFeature from "../addFeature/AddFeature";
import { useHandleFile, usePostTitle } from "@/app/hooks";
import { CustomEditor } from "../editors/mdx-editor/editor";
import SearchTagsModal from "./desc-modal";
import { MDXEditorMethods } from "@mdxeditor/editor";

export default function PostEdit({ post }: { post: any }) {
  const { desc, id, published, publishedDate, content, postImg } = post
  const storagePost = Storage.getStorageItem("post") || {};
  const [openPreview, setOpenPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const { title, handleTitle } = usePostTitle(post?.title || storagePost?.title);
  const { setFile, media, setMedia } = useHandleFile(postImg);
  const [openDescModal, setOpenDescModal] = useState<boolean>(false)
  const ref = React.useRef<MDXEditorMethods>(null)
  const [storageContent, setStorageContent] = useState(content);
  const markdown = content || 'Edit your story here';
  const [lastEditSession, setLastEditSession] = useState<{
    timestamp: string;
    postId: string;
  } | null>(null);

  useEffect(() => {
    if (storageContent) {
      console.log(storageContent, 'storageContent');
      ref.current?.setMarkdown(storageContent);
    }
  }, [storageContent]);

  const editorMarkdown = ref.current?.getMarkdown() as string;
  const isPageReload = useCallback(() => {
    return window.performance
      .getEntriesByType('navigation')
      .map((nav) => (nav as any).type)
      .includes('reload');
  }, []);

  const publishPost = async () => {
    setOpenDescModal(!openDescModal)
  };

  const slug = slugify(title)
  const modalData = {
    title,
    postImg: media,
    slug: slug,
    markdown: editorMarkdown,
    desc: desc,
    id: id
  };

  const handleAutoSave = useCallback(async () => {
    if (!title) return;

    setIsSaving(true);
    try {
      const data = {
        title,
        postImg: media,
        content: editorMarkdown,
        markdown: editorMarkdown,
        published,
        publishedDate,
        slug,
        id
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
  }, [title, media, editorMarkdown, published, publishedDate, id, slug]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await handleAutoSave();
    }, 18000); //auto updates every 3 minutes 180000
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

  useEffect(() => {
    let lastVisibleTime = Date.now();
    const handleVisibilityChange = async () => {
      const currentTime = Date.now();

      if (document.hidden) {
        if (currentTime - lastVisibleTime > 1000) { // 1 second debounce
          await handleAutoSave();
        }
      } else {
        lastVisibleTime = currentTime;
      }

      if (document.hidden) {
        await handleAutoSave();
        console.log("Auto save called")
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleAutoSave]);

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      if (!isPageReload()) {
        await handleAutoSave();
        setLastEditSession({
          timestamp: new Date().toISOString(),
          postId: id
        });
      }
    };

    const handleUnload = async () => {
      if (!isPageReload()) {
        Storage.removeFromStorage('markdown')
        Storage.removeFromStorage('post')
        if (lastEditSession) {
          Storage.setToStorage("lastEditSession", lastEditSession);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleAutoSave, id, isPageReload, lastEditSession]);

  useEffect(() => {
    const lastSession = Storage.getStorageItem("lastEditSession");
    if (lastSession) {
      setLastEditSession(lastSession);
    }
  }, []);

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
            <Image src={media} alt="image" fill priority />
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
        <CustomEditor ref={ref} markdown={storageContent} />
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
          {published ? 'Republish' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
