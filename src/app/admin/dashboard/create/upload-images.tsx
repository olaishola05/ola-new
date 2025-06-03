import React from 'react'
import Image from 'next/image'

type UploadImagesProps = {
  coverImg: string | null;
  images: string[];
  setImages: (images: string[]) => void;
}


export default function UploadImages({ coverImg, images, setImages }: UploadImagesProps) {
  return (
    <div>
      {coverImg && (
        <div className="mt-4">
          <h3>Cover Image:</h3>
          <Image
            src={coverImg} alt="Cover"
            className="w-32 h-32 object-cover rounded"
            width={128}
            height={128}
            loading="lazy"
          />
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
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                  width={96}
                  height={96}
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
