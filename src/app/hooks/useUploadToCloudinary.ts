'use client';

interface ImageData {
  url: string;
  publicId: string;
}

export const useUploadToCloudinary = async (file: File, preset: string): Promise<ImageData> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};