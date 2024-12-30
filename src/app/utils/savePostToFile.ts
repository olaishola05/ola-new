import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
  let postId: string;

  if (existingFilePath) {
    filePath = existingFilePath;
    fileSlug = path.basename(filePath, '.mdx');
    postId = fileSlug
  } else {
    const fileId = `${uuidv4()}-${Date.now()}.mdx`;
    filePath = path.join(postsDirectory, fileId);
    postId = fileId.split('.')[0];
  }

  const formattedCategories = categories ? `[${categories.map(cat => `"${cat}"`).join(', ')}]` : '[]';

  const markdownContent = `---

  title: "${title || ''}"
  slug: "${slug || ''}"
  description: "${description || ''}"
  author: "${author || ''}"
  postImg: "${postImg || ''}"
  postId: "${postId}"
  categories: ${formattedCategories}
  published: ${published || false}
  date: "${publishedDate || ''}"

---

  ${markdown}
  `

  return { markdownContent, filePath };
}