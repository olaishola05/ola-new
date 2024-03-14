import React from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import styles from './preview.module.css'
import { NodeHtmlMarkdown } from 'node-html-markdown'


export default function PostPreview() {
  const [value, setValue] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [img, setImg] = React.useState('')

  React.useEffect(() => {
    const content = window.localStorage.getItem('content')
    const postTitle = window.localStorage.getItem('postTitle')
    const postImg = window.localStorage.getItem('img')
    if (content && postTitle && postImg) {
      setValue(JSON.parse(content).html)
      setTitle(JSON.parse(postTitle).title)
      setImg(JSON.parse(postImg).img)
    }
  }, [])

  const markdown = NodeHtmlMarkdown.translate(value);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {img && <div className={styles.image}>
        <Image src={img} alt='article image' fill />
      </div>}
      <div className={styles.previews}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}
