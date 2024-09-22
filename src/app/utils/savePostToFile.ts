import path from 'path';

interface FileProps {
  title: string;
  slug: string;
  postImg?: string;
  markdown: string;
  existingFilePath?: string;
}

export function savePostToFile({ title, slug, postImg, markdown, existingFilePath }: FileProps) {
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
  postImg: "${postImg}"

---

  ${markdown}
  `

  return { markdownContent, filePath, fileSlug }
}