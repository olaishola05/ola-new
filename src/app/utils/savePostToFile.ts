import path from 'path';

interface FileProps {
  title: string;
  slug: string;
  postImg?: string;
  markdown: string;
  existingFilePath?: string;
  published?: boolean
  publishedDate?: Date
  author?: string | undefined | null
  categories?: string[]
  description?: string | undefined | null
}

export function savePostToFile(
  { title, slug, postImg, markdown, published, publishedDate, existingFilePath, author, categories, description }: FileProps) {
  const postsDirectory = 'posts';

  let filePath: string;
  let fileSlug: string;

  if (existingFilePath) {
    filePath = existingFilePath;
    fileSlug = path.basename(filePath, '.md');
  } else {
    fileSlug = title.toLowerCase().replace(/ /g, '-');
    const fileName = `${fileSlug}.md`;
    filePath = path.join(postsDirectory, fileName);
  }

  const markdownContent = `---

  title: "${title}"
  slug: "${slug}"
  description: "${description}"
  author: "${author}"
  postImg: "${postImg}"
  categories: "${categories}"
  published: "${published}"
  date: "${publishedDate}"

---

  ${markdown}
  `

  return { markdownContent, filePath, fileSlug }
}