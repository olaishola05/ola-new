'use server';

import path from 'path';
import fs from 'fs';

interface FileExistProps {
  initSlug: string
  markdownContent: string
  fileSlug: string
  filePath: string
}

const mappingFilePath = path.join(process.cwd(), 'slugMapping.json');

function loadSlugMapping(): Record<string, string> {
  if (fs.existsSync(mappingFilePath)) {
    const data = fs.readFileSync(mappingFilePath, 'utf8');
    return JSON.parse(data);
  }
  return {};
}

function saveSlugMapping(mapping: Record<string, string>): void {
  fs.writeFileSync(mappingFilePath, JSON.stringify(mapping, null, 2));
}

export async function createOrUpdateFile({ initSlug, markdownContent, fileSlug, filePath }: FileExistProps) {
  const slugMapping = loadSlugMapping();

  if (initSlug && slugMapping[initSlug]) {
    const oldFilePath = slugMapping[initSlug];
    if (fs.existsSync(oldFilePath)) {
      // Update the existing file
      fs.writeFileSync(oldFilePath, markdownContent);
      // Update the mapping with the new slug
      delete slugMapping[initSlug];
      slugMapping[fileSlug] = oldFilePath;
    } else {
      // Create a new file if the old file doesn't exist
      fs.writeFileSync(filePath, markdownContent);
      slugMapping[fileSlug] = filePath;
    }
  }
  saveSlugMapping(slugMapping);
}