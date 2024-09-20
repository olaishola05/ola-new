import path from 'path';

interface FileProps {
  title: string;
  slug: string;
  postImg?: string;
  markdown: string
}

export async function savePostToFile({ title, slug, postImg, markdown }: FileProps) {
  const fileSlug = title.toLowerCase().replace(/ /g, '-');
  const fileName = `${fileSlug}.md`;
  const filePath = path.join(process.cwd(), 'posts', fileName);
  const relativePath = path.relative(process.cwd(), filePath);
  const markdownContent = `---

  title: "${title}"
  slug: "${slug}"
  postImg: "${postImg}"

---

  ${markdown}
  `

  return { relativePath, markdownContent, filePath, fileSlug }
}