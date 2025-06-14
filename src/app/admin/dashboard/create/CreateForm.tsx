"use client";

import React, { ReactNode, useCallback, useState } from "react";
import { sendDataToBackend, textToParagraphArray } from "@/app/utils";
import { useForm } from "react-hook-form";
import { ControllInput } from "@/components";
import { Project } from "@/app/types";
import { tailwindToast } from "@/components/Toast/Toast";
import InputFile from "@/components/Form/file-input";
import UploadImages from "./upload-images";
import { useDeleteUploadImg } from "@/app/hooks";

interface ImageData {
  url: string;
  publicId: string;
}

const InputBoxStyles = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-3">{children}</div>
);

export default function CreateForm() {
  const [coverImg, setCoverImg] = useState<ImageData | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [responseOk, setResponseOk] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const deleteUploadedImage = useDeleteUploadImg();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<Project>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: [],
      githubUrl: "",
      liveUrl: "",
      stacks: [],
      coverImgUrl: "",
      images: [],
      tag: "",
    },
  });

  const handleReset = useCallback(() => {
    tailwindToast("info", "Resetting form...", "", "");
    reset();
    setCoverImg(null);
    setImages([]);
  }, [reset]);

  const onSubmit = async (data: Project) => {
    const newData: Project = {
      ...data,
      description: textToParagraphArray((data.description ?? "").toString()),
      coverImgUrl: coverImg?.url || "",
      images: images.map((img: ImageData) => img.url.trim()),
      stacks: data?.stacks
        ?.toString()
        .split(",")
        .map((item: string) => item.trim()),
    };

    const res = await sendDataToBackend(
      newData,
      `${process.env.NEXT_PUBLIC_API_URL}`,
    );
    if (res?.status === 201) {
      tailwindToast("success", `${res?.data.message}`, "", "");
      setResponseOk(!responseOk);
    } else {
      tailwindToast("error", `Oops! ${res}`, "", "");
    }
  };

  React.useEffect(() => {
    if (responseOk) {
      handleReset();
    }
  }, [responseOk, reset, handleReset]);

  const handleDeleteImage = async (publicId: string) => {
    setIsDeleting(publicId);

    try {
      const response = await deleteUploadedImage({ publicId });
      if (response.ok) {
        if (coverImg?.publicId === publicId) {
          setCoverImg(null);
          tailwindToast("success", "Cover image deleted successfully", "", "");
        } else {
          tailwindToast("success", "Image deleted successfully", "", "");
          setImages(images.filter(img => img.publicId !== publicId));
        }
      } else {
        tailwindToast('error', 'Failed to delete image', '', '');
      }
    } catch (error) {
      tailwindToast('error', 'An error occurred while deleting the image', '', '');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <form
        className="w-full my-[50px] p-3 bg-[var(--bg)] mx-auto flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputBoxStyles>
          <ControllInput
            control={control}
            name="name"
            placeholder="Project Name"
            width={"100%"}
            inputprops={register("name")}
          />
          <ControllInput
            control={control}
            name="tag"
            placeholder="e.g frontend, backend, fullstack, etc"
            size="small"
            width={"100%"}
            inputprops={register("tag")}
          />
        </InputBoxStyles>
        <InputBoxStyles>
          <ControllInput
            control={control}
            name="githubUrl"
            placeholder="Github URL"
            width={"100%"}
            inputprops={register("githubUrl")}
            required={false}
          />

          <ControllInput
            control={control}
            name="liveUrl"
            placeholder="Live URL"
            width={"100%"}
            inputprops={register("liveUrl")}
            required={false}
          />
        </InputBoxStyles>

        <InputBoxStyles>
          <InputFile
            label="Cover Image"
            name="coverImg"
            setCoverImg={setCoverImg}
            isMultiple={false}
          />
          <InputFile
            label="Other Images"
            name="otherImages"
            setImages={setImages}
            isMultiple={true}
            currentImages={images}
          />
        </InputBoxStyles>
        <ControllInput
          control={control}
          name="stacks"
          placeholder="e.g React, Node, Express, MongoDB, etc"
          size="small"
          inputprops={register("stacks")}
        />

        <ControllInput
          control={control}
          placeholder="e.g Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          size="small"
          name="description"
          type="textarea"
        />

        <UploadImages
          coverImg={coverImg}
          images={images}
          onDeleteImage={handleDeleteImage}
          isDeleting={isDeleting}
        />
        <div className="w-full flex gap-4 justify-center mt-3">
          <button
            type="submit"
            disabled={!register}
            className="w-[30%] p-2 bg-[var(--cta)] text-[var(--ctaText)] rounded-md self-center text-lg hover:cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Create"}
          </button>

          <button
            type="button"
            className="w-[30%] p-2 bg-white text-[var(--primary)] rounded-md self-center text-lg border border-[var(--primary)] hover:cursor-pointer cancel"
            onClick={() => handleReset()}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
