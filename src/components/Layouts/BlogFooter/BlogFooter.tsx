import React from 'react'
import Link from 'next/link'
import styles from './blogFooter.module.css'
import SubscribeForm from '@/components/Subscribe/SubscribeForm'
import Tags from './Tags'
import FooterSocialMedia from './footer-social-media'

export default function BlogFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Code &apos;n&apos; Beyond</h1>
        </div>
        <p className={styles.desc}>
          Be the first to read my posts, join the conversation,
          and let&apos;s learn together in this exciting journey through code and beyond by subscribing to my newsletter.
        </p>
        <SubscribeForm />
        <FooterSocialMedia />
        <p className='flex items-center gap-1 m-1 md:text-base'>
          {'Copyright © '}
          <Link href="https://github.com/olaishola05"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oladipupo Ishola
          </Link>{' '}
          {new Date().getFullYear()}.
        </p>
      </div>

      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href='/'>Homepage</Link>
          <Link href='/about'>About</Link>
          <Link href='/contact'>Contact</Link>
          <Link href='/blog'>Blog</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Tags />
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href='https://www.facebook.com/olaishola05' target='_blank'>Facebook</Link>
          <Link href='https://www.instagram.com/olaishola05/' target='_blank'>Instagram</Link>
          <Link href='https://github.com/olaishola05' target='_blank'>GitHub</Link>
          <Link href='https://twitter.com/olaishola05' target='_blank'>Twitter</Link>
          {/* <Link href='/' target='_blank'>Tiktok</Link>
          <Link href='https://www.youtube.com/channel/UChYoTDbsoVoy96zE6puefqQ' target='_blank'>Youtube</Link> */}
        </div>
      </div>
    </div>
  )
}
