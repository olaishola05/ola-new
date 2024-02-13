import React from 'react'
import Image from 'next/image'
import Menu from '@/components/Menu/Menu'
import styles from './slug.module.css'
import Comments from '@/components/Comments/Comments'

const getPost = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/posts/${slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.log(res)
    // throw new Error(res.statusText)
  }

  return res.json()
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // const post = await getPost(slug);
  // const { title, desc, img, user } = post?.data;
  const post = {
    title: 'Something incredible',
    desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, quo porro. In cumque aperiam, voluptatum quaerat tempora quia. Unde laudantium voluptas maiores quam soluta, obcaecati alias iusto ipsum perferendis a.',
    img: '/images/contact1.png',
    user: {
      image: '/images/contact1.png',
      name: 'John Doe'
    }
  }

  const { title, desc, img, user } = post;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.user}>
            {user?.image && (
              <div className={styles.userImgContainer}>
                <Image src={user?.image} alt="user" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{user?.name}</span>
              <span className={styles.date}>01.10.2024</span>
            </div>
          </div>
        </div>
        {img && (<div className={styles.imgContainer}>
          <Image src={img} alt="blog image" className={styles.image} fill />
        </div>)}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}
            dangerouslySetInnerHTML={{ __html: desc }} />
          <div className={styles.comments}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  )
}
