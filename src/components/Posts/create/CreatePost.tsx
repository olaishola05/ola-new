'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './createpost.module.css'
import PostPreview from './PostPreview';
import AddFeature from '../addFeature/AddFeature';
import NovelEditor from '../editors/novel/NovelEditor';
import { JSONContent } from 'novel';
import { slugify } from '@/app/utils/utilities';
import { clearStorage } from './utils';

export default function CreatePost() {
  const [value, setValue] = React.useState<null | JSONContent>(
    null,
  );
  const [title, setTitle] = React.useState('');
  const [media, setMedia] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [openPreview, setOpenPreview] = React.useState(false)
  const [htmlValue, setHtmlValue] = React.useState('')
  const [autoSave, setAutoSave] = React.useState(false)
  const [autoSaveMessage, setAutoSaveMessage] = React.useState('')

  const router = useRouter()

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          setMedia(reader.result as string);
          window.localStorage.setItem('img', JSON.stringify({ img: reader.result }))
        }
      }
      reader.readAsDataURL(file)
    }
  }, [file])

  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
    window.localStorage.setItem('postTitle', JSON.stringify({ title: e.target.value }))
  }

  useEffect(() => {
    const postTitle = window.localStorage.getItem('postTitle')
    const postImg = window.localStorage.getItem('img')
    if (postTitle && postImg !== null) {
      setMedia(JSON.parse(postImg).img)
      setTitle(JSON.parse(postTitle).title)
    }
  }, [])

  const handlePublish = async () => {
    const data = {
      title,
      desc: htmlValue,
      rawPost: value,
      img: media,
      slug: slugify(title),
      catSlug: "coding",
    }
    const res = await fetch('/api/v1/posts', {
      method: 'UPDATE',
      body: JSON.stringify({
        ...data,
        published: true,
        updatedAt: new Date()
      })
    }
    )
    if (res.ok) {
      router.push(`/posts/${data.slug}`)
      clearStorage();
    }
  }

  const safeDraft = React.useCallback(async () => {
    const data = {
      title,
      desc: htmlValue,
      rawPost: value,
      img: media,
      slug: slugify(title),
      catSlug: "coding",
      updatedAt: new Date()
    }
    const res = await fetch('/api/v1/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (res.ok) {
      setAutoSave(!autoSave);
      setAutoSaveMessage('Draft saved')
      setTimeout(() => {
        setAutoSave(!autoSave);
        setAutoSaveMessage('');
      }, 3000);
    }
  }, [value, title, htmlValue, media, autoSave]);


  const handleAutoSave = React.useCallback(async () => {
    if (value) {
      try {
        const slug = slugify(title)
        const response = await fetch(`/api/v1/posts/${slug}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title,
            desc: htmlValue,
            rawPost: value,
            img: media,
            slug: slug,
            catSlug: "coding", //for temp, will be set when publishing
          }),
        });
        if (response.ok) {
          setAutoSave(!autoSave);
          setAutoSaveMessage('Auto saved');
          setTimeout(() => {
            setAutoSave(!autoSave);
            setAutoSaveMessage('');
          }, 3000);
        } else {
          console.error('Error while saving data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('An error occurred during the API request:', error);
      }
    }
  }, [value, title, htmlValue, media, autoSave]);


  useEffect(() => {
    const initialSave = async () => {
      if (value && title) {
        await safeDraft()
      }
    }
    initialSave()
    return () => {
      window.removeEventListener('beforeunload', safeDraft)
    }
  }
    , [value])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (value) {
        await handleAutoSave()
      }
    }, 300000)
    return () => clearInterval(interval)
  }, [value, handleAutoSave])

  const handlePreview = () => {
    setOpenPreview(!openPreview)
  }

  return (
    <div className={styles.container}>
      {autoSave && <span className={styles.autoSave}>{autoSaveMessage}</span>}
      {openPreview && <PostPreview />}
      {!openPreview && (
        <React.Fragment>
          <label className='w-full flex gap-2 items-center'>
            <textarea name="title" placeholder="Post title" className={styles.input} onChange={(e) => handleTitle(e)} defaultValue={title} />
          </label>
          {media && (
            <div className={styles.postImage}>
              <Image src={media} alt='image' fill />
              <button
                className='bg-blue-500 text-white px-2 py-1 rounded-md'
              >Change Image</button>
            </div>
          )}

          {!media && <AddFeature setFile={setFile} styles={styles} />}
          <NovelEditor value={value} setValue={setValue} html={setHtmlValue} />
        </React.Fragment>
      )}
      <div className='flex gap-4 mt-5'>
        <button type="button" className={styles.preview} onClick={handlePreview}>{openPreview ? 'Continue editing' : 'Preview'}</button>
        <button type="button" className={styles.publish} onClick={handlePublish}>Publish</button>
      </div>
    </div>
  )
}
