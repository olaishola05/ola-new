import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './blogFooter.module.css'
import Logo from '../Logo'
import { socialLinks } from '@/app/utils'
import CustomIcon from '@/components/IconsComponent/CustomIcon'
import SubscribeForm from '@/components/Subscribe/SubscribeForm'


export default function BlogFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Logo />
          <h1 className={styles.logoText}>Olaishola blog</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur quo, ducimus placeat alias minus quam, beatae aut deleniti fuga incidunt sunt reiciendis iure perferendis similique! Vel!
        </p>
        <SubscribeForm />
        <div className={styles.icons}>
          {socialLinks.map(({ id, path, icon }) => (
            <Link href={path} target='_blank'
              rel='noopener noreferrer' key={id}>
              <CustomIcon icon={icon} className='h-[18px] w-[18px] text-[var(--primary)]' />
            </Link>
          ))}
        </div>
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
          <Link href='/blog/posts?cat=style'>Style</Link>
          <Link href='/blog/posts?cat=fashion'>Fashion</Link>
          <Link href='/blog/posts?cat=coding'>Coding</Link>
          <Link href='/blog/posts?cat=travel'>Travel</Link>
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
