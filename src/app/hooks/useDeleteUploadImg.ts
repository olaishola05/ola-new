"use client";

export const useDeleteUploadImg = () => {
  return async ({
    publicId,
    projectId,
    type,
  }: {
    publicId: string;
    projectId?: string;
    type?: "cover" | "image";
  }) => {
    const isEdit = projectId && type;
    const endpoint = isEdit ? "/api/v1/delete-db-image" : "/api/v1/delete-cloud-image";
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId, projectId, type }),
      });

      if (!response.ok) throw new Error("Failed to delete image");

      return response;
    } catch (error) {
      console.error("Image delete hook error:", error);
      throw error;
    }
  };
};
