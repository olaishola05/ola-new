import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './blogFooter.module.css'
import Logo from '../Logo'

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
        <div className={styles.icons}>
          <Image src='/facebook.png' alt='linkedin' width={18} height={18} />
          <Image src='/youtube.png' alt='twitter' width={18} height={18} />
          <Image src='/tiktok.png' alt='github' width={18} height={18} />
          <Image src='/instagram.png' alt='threads' width={18} height={18} />
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
          <Link href='/'>Style</Link>
          <Link href='/about'>Fashion</Link>
          <Link href='/contact'>Coding</Link>
          <Link href='/login'>Travel</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href='/'>Facebook</Link>
          <Link href='/'>Instagram</Link>
          <Link href='/'>Tiktok</Link>
          <Link href='/'>Youtube</Link>
        </div>
      </div>
    </div>
  )
}
