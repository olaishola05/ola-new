import { fetchPublishedPosts } from "@/app/lib";
import SuggestedPost from "@/components/Posts/suggest posts/suggested-post";

const getPosts = async () => {
  const posts = await fetchPublishedPosts()
  return { posts }
}

function getTwoRandomItems<T>(arr: T[]): T[] {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

export default async function RelatedPosts({ slug }: { slug: string }) {
  const { posts } = await getPosts()

  if (!posts) {
    return null
  }
  const filteredPosts = posts?.filter((post) => post?.data.slug != slug)
  const data = getTwoRandomItems(filteredPosts)
  return (
    <div>
      <h2 className='mb-2 text-2xl md:text-3xl text-softText'>Related Posts</h2>
      <div className="flex flex-col md:flex-row gap-5 mb-[30px]">
        {data.map((post, index) => (
          <SuggestedPost key={index} post={post?.data} />
        ))}
      </div>
    </div>
  )
}