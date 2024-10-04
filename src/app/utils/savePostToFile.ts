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
    fileSlug = path.basename(filePath, '.mdx');
  } else {
    fileSlug = title.toLowerCase().replace(/ /g, '-');
    const fileName = `${fileSlug}.mdx`;
    filePath = path.join(postsDirectory, fileName);
  }

  const formattedCategories = categories ? `[${categories.map(cat => `"${cat}"`).join(', ')}]` : '[]';

  const markdownContent = `---

  title: "${title || ''}"
  slug: "${slug || ''}"
  description: "${description || ''}"
  author: "${author || ''}"
  postImg: "${postImg || ''}"
  categories: ${formattedCategories}
  published: ${published || false}
  date: "${publishedDate || ''}"

---

  ${markdown}
  `

  return { markdownContent, filePath, fileSlug }
}