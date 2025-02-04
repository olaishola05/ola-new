'use client'

import React, {useEffect, useState} from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import {Cross2Icon, MagnifyingGlassIcon} from '@radix-ui/react-icons';
import {Tag, tags} from '@/app/utils'
import {Storage} from '@/app/utils/utilities';
import toast from 'react-hot-toast';
import * as actions from "@/actions";

interface ModalProps {
  open: boolean
  closeModal: (open: boolean) => void
  data: any
}

const SearchTagsModal = ({ open, closeModal, data }: ModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [description, setDescription] = useState(data?.desc || '');
  const [isPublishing, setIsPublishing] = useState<boolean>(false)

  useEffect(() => {
    if (searchTerm) {
      const results = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const addTag = (tag: Tag) => {
    if (!selectedTags.some(t => t.name === tag.name)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const removeTag = (tagName: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.name !== tagName));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= 200) {
      setDescription(e.target.value);
    }
  };

  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;

  const handleContinue = async () => {
    if (description === '' || selectedTags.length <= 0) {
      toast.error("Description needed for SEO & Minimum one tag", {
        position: 'top-center',
        className: 'text-red-700 text-lg p-2'
      })
      setIsPublishing(false)
      return
    }

    const categories = selectedTags.map(cat => cat.name)
    const updateData = {
      ...data,
      catSlug: categories[0],
      categories,
      desc: description
    }
    setIsPublishing(!isPublishing)
    const response = await actions.publishPost(updateData);
    if (response?.error) {
      toast.error(response?.error, {
        position: 'top-center',
        className: 'text-red-700 text-lg p-2'
      })
    } else {
      Storage.removeFromStorage("post");
      Storage.removeFromStorage('markdown')
      setIsPublishing(!isPublishing)
      closeModal(!open)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={closeModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 -z-10" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-softBg rounded-lg shadow-lg p-6 w-full max-w-xl" aria-describedby='modal'>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-500">
              Short Description (Max 200 words)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Enter a short description..."
            />
            <p className="text-sm text-gray-500">
              {wordCount}/200 words
            </p>
          </div>
          <Dialog.Title className="text-lg font-semibold mb-1">Search Tags</Dialog.Title>
          <div className="space-y-4">
            <div className="flex items-center gap-2 border rounded p-2 bg-bg">
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder='e.g React, Custom Hooks, Validations'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>
            <div className="max-h-[200px] overflow-y-auto bg-bg">
              {searchTerm !== '' && searchResults.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => addTag(tag)}
                  className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-textColor"
                >
                  {tag.name} - {tag.category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, index) => (
                <span key={index} className="inline-flex items-center bg-ctaText rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-5">
                  {tag.name}
                  <button
                    onClick={() => removeTag(tag.name)}
                    className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Cross2Icon className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 text-textColor hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon className="h-4 w-4" />
            </button>
          </Dialog.Close>
          <div className='flex gap-3 items-center justify-center border'>
            <button
              className="text-ctaText bg-cta w-max p-3 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Continue"
              onClick={handleContinue}
              type='submit'
              disabled={isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
            <Dialog.Close>
              <button
                className="text-cta w-max bg-white rounded-lg border border-cta p-3"
                aria-label="Close"
              >
                Cancel
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchTagsModal;
