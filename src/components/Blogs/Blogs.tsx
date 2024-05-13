import { BlogSection } from "..";

interface BlogProps {
  fetchData: () => void;
}

export default async function Blogs({ fetchData }: BlogProps) {
  const posts = await fetchData();

  return (
    <div>
      <BlogSection data={posts} />
    </div>
  );
}
