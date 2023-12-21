export const uploadToCloudinary = async (photo: any) => {
  const preset = `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`;
  const url = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`;
  const formData = new FormData();
  formData.append('file', photo[0]);
  formData.append('upload_preset', preset);
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  return result.secure_url;
}