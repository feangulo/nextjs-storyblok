import { useEffect, useState } from 'react'
import Head from 'next/head'
import Post from '../components/post'

function HomePage() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function getPosts() {
      const res = await fetch(
        `https://api.storyblok.com/v1/cdn/stories?token=${
          process.env.API_TOKEN
        }`
      )
      const { stories } = await res.json()
      setPosts([...stories])
    }
    getPosts()
  }, [])
  return (
    <>
      <Head>
        <title>Next.js + Storyblok</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      {posts.length > 0
        ? posts.map(p => (
            <Post
              alt={p.content.alt}
              date={p.content.date}
              key={p.content.title}
              image={p.content.image}
              title={p.content.title}
              url={p.content.url}
            />
          ))
        : null}
    </>
  )
}

export default HomePage
