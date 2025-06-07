"use client";

import React, { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { ControllInput } from "@/components";
import { Project } from "@/app/types";
import { extractPublicId, updateProject, textToParagraphArray } from "@/app/utils";
import { useRouter } from "next/navigation";
import EditBottom from "../EditBottom";
import { errorToast, successToast } from "@/components/Toast/Toast";
import UploadImages from "../../../create/upload-images";
import { useDeleteUploadImg } from "@/app/hooks";
import InputFile from "@/components/Form/file-input";

interface ImageData {
  url: string;
  publicId: string;
}
const InputBoxStyles = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-3">{children}</div>
);

export default function EditForm({ project }: { project: Project }) {
  const [coverImg, setCoverImg] = useState<ImageData | null>({ url: project?.coverImgUrl || "", publicId: extractPublicId(project?.coverImgUrl) || "" });
  const [images, setImages] = useState<ImageData[]>(project?.images?.map((img: string) => {
    const publicId = extractPublicId(img);
    return { url: img, publicId: publicId };
  }) || []);

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
      ...project,
      description: Array.isArray(project?.description)
        ? project.description.map((item: string) => item).join("\n\n")
        : project?.description || ""
    },
  });
  const router = useRouter();

  const onSubmit = async (data: Project) => {
    const newStacks = data.stacks
      .toString()
      .split(",")
      .map((item) => item.trim());
    const updatedData: Project = {
      ...data,
      description: textToParagraphArray((data.description ?? "").toString()),
      coverImgUrl: coverImg?.url || "",
      images: images.map((img: ImageData) => img.url.trim()),
      stacks: newStacks,
    };
    const res = await updateProject(
      project?.id,
      updatedData,
      `${process.env.NEXT_PUBLIC_API_URL}`,
    );
    if (res?.status === 200 || res?.status === "success") {
      successToast(res?.message);
      router.push(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/projects/${project.id}`,
      );
    } else {
      errorToast(res?.message);
    }
  };

  const handleDeleteImage = async (publicId: string, isCover = false) => {
    setIsDeleting(publicId);

    try {
      const response = await deleteUploadedImage({ publicId, projectId: project.id, type: isCover ? "cover" : "image" });
      if (response.ok) {
        if (isCover) {
          setCoverImg(null);
          successToast("Cover image deleted successfully");
        } else {
          successToast("Image deleted successfully");
          setImages(images.filter(img => img.publicId !== publicId));
        }
      } else {
        errorToast('Failed to delete image');
      }
    } catch (error) {
      errorToast('An error occurred while deleting the image');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <form
        className="w-11/12 my-[100px] mx-auto flex flex-col gap-5 p-6 bg-[var(--bg)]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputBoxStyles>
          <ControllInput
            control={control}
            name="name"
            placeholder="Project Name"
            width={"100%"}
            size="small"
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
            size="small"
            width={"100%"}
            inputprops={register("githubUrl")}
          />

          <ControllInput
            control={control}
            name="liveUrl"
            placeholder="Live URL"
            size="small"
            width={"100%"}
            inputprops={register("liveUrl")}
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
          placeholder={`${project?.name} is an app for ...`}
          size="small"
          name="description"
          type="textarea"
        />
        {!coverImg && (<InputFile
          name="coverImg"
          label="Add Cover Image"
          setCoverImg={setCoverImg}
          isMultiple={false}
        />)}
        {images.length > 1 && (
          <InputFile
            name="otherImages"
            label="Add Images"
            setImages={setImages}
            currentImages={images}
            isMultiple={true}
          />
        )}
        <UploadImages
          coverImg={coverImg}
          images={images}
          onDeleteImage={handleDeleteImage}
          isDeleting={isDeleting}
        />
        <EditBottom
          project={project}
          reset={reset}
          register={register}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
}
