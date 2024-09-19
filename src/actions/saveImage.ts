'use server';

import fs from 'fs';
import path from 'path';
import { uuid } from 'uuidv4';

export const saveFile = async (fileBase64: string, fileName: string): Promise<string> => {
  const data = Buffer.from(fileBase64, 'base64');
  const uploadDir = path.join(process.cwd(), '/public/images/blogs');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueFileName = `${uuid()}-${Date.now()}-${fileName}`;
  const filePath = path.join(uploadDir, uniqueFileName);

  fs.writeFileSync(filePath, data);
  return `/images/blogs/${uniqueFileName}`;
};
