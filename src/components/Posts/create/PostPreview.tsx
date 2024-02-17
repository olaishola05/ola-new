import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import styles from './preview.module.css'

export default function PostPreview({ value, title, img }: { value: string, title: string, img?: string }) {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      {img && <div className={styles.image}>
        <Image src={img} alt='article image' fill />
      </div>}
      <div className={styles.previews}>
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </>
  )
}
