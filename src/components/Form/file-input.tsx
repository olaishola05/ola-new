import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUploadToCloudinary } from '@/app/hooks';
import { tailwindToast } from '../Toast/Toast';

interface InputFileProps {
  label?: string;
  name: string;
  setCoverImg?: (imageUrl: string) => void;
  setImages?: (images: string[]) => void;
  isMultiple?: boolean;
  currentImages?: string[];
}

export default function InputFile({ label,
  name,
  setCoverImg,
  setImages,
  isMultiple = false,
  currentImages = []
}: InputFileProps) {

  const [isUploading, setIsUploading] = useState(false);
  const uploadToCloudinary = useUploadToCloudinary;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      if (isMultiple && setImages) {
        const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file, 'projects'));
        const uploadedUrls = await Promise.all(uploadPromises);
        setImages([...currentImages, ...uploadedUrls]);
      } else if (!isMultiple && setCoverImg) {
        const uploadedUrl = await uploadToCloudinary(files[0], 'projects');
        setCoverImg(uploadedUrl);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      tailwindToast('error', 'Upload failed', '', '');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <Label htmlFor={name} className='text-textColor text-base'>{label}</Label>
      <div className="w-full max-w-sm">
        <Input
          id={name}
          type="file"
          name={name}
          accept="image/*"
          className="shadow-none border-none p-0"
          onChange={handleFileChange}
          multiple={isMultiple}
          disabled={isUploading}
        />
        {isUploading && (
          <p className="text-sm text-blue-600 mt-1">Uploading...</p>
        )}
        {currentImages.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {currentImages.length} image{currentImages.length > 1 ? 's' : ''} uploaded
          </p>
        )}
      </div>
    </div>
  )
}
