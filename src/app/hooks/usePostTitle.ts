"use client";

import { useState } from "react";
import { Storage } from "@/app/utils/utilities";

const usePostTitle = (initialValue: string) => {
  const storagePost = Storage.getStorageItem("post") || {};
  const [title, setTitle] = useState(storagePost?.title || initialValue);

  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updateTitle = e.target?.value;
    setTitle(updateTitle);
    const updatedPost = { ...storagePost, title: updateTitle };
    Storage.setToStorage("post", updatedPost);
  };

  return { title, handleTitle };
};

export default usePostTitle;
