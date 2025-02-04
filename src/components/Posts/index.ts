interface Tag {
  id: string;
  slug: string;
  title: string;
  postId: string;
  img: string | null;
}

export function mostUsedTags(tags: Tag[]): string[] {
  const titleCounts = tags.reduce((acc, tag) => {
    acc[tag.title] = (acc[tag.title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(titleCounts)
    .filter(([_, count]) => count > 1)
    .map(([title]) => title);
}