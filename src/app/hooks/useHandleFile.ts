"use client";

import { useState, useEffect } from "react";
import { Storage } from "@/app/utils/utilities";
import { saveFile } from "@/actions";

type initialMedia = string;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const useHandleFile = (intialValue: initialMedia) => {
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState(
    Storage.getStorageItem("post")?.img || intialValue,
  );

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.readyState === FileReader.DONE && reader.result) {
          const base64data = (reader.result as string).split(',')[1];
          const url = await saveFile(base64data, file.name);
          const storagePost = Storage.getStorageItem("post") || {};
          setMedia(`${baseUrl}${url}`);
          const updatedPost = { ...storagePost, img: `${baseUrl}${url}` };
          Storage.setToStorage('post', updatedPost)

        }
      };
      reader.readAsDataURL(file);
    }
  }, [file, setMedia]);

  return { setFile, media, setMedia };
};

export default useHandleFile;
