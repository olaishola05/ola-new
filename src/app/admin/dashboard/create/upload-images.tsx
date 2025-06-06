import React from 'react'
import Image from 'next/image'

interface ImageData {
  url: string;
  publicId: string;
}
type UploadImagesProps = {
  coverImg: ImageData | null;
  images: ImageData[];
  onDeleteImage?: (publicId: string, isCover: boolean) => void;
  isDeleting: string | null;
}


export default function UploadImages({ coverImg, images, onDeleteImage, isDeleting }: UploadImagesProps) {
  return (
    <div className='flex gap-8'>
      {coverImg && (
        <div className="mt-4">
          <h3>Cover Image:</h3>
          <div className="relative inline-block">
            <Image
              src={coverImg?.url} alt="Cover"
              className="w-32 h-32 object-cover rounded"
              width={128}
              height={128}
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => onDeleteImage?.(coverImg.publicId, true)}
              disabled={isDeleting === coverImg.publicId}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting === coverImg.publicId ? '...' : '×'}
            </button>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-4">
          <h3>Other Images:</h3>
          <div className="flex gap-2 flex-wrap">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  key={index}
                  src={img.url}
                  alt={`Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                  width={96}
                  height={96}
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => onDeleteImage?.(img.publicId, false)}
                  disabled={isDeleting === img.publicId}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                >
                  {isDeleting === img.publicId ? '...' : '×'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
