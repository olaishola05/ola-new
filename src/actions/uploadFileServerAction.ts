'use server'

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const saveFile = async (file: File): Promise<string> => {
  const data = await file.arrayBuffer();
  const uploadDir = path.join(process.cwd(), '/public/images/blogs');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${uuidv4()}-${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, Buffer.from(data));
  return `/images/blogs/${fileName}`;
};

export async function uploadFileServerAction(formData: FormData) {
  try {
    const file = formData.get('fileUpload') as File
    if (!formData) {
      return {
        errors: {
          message: 'No file uploaded'
        }
      }
    }
    const fileUrl = await saveFile(file)
    const url = `${baseUrl}${fileUrl}`
    return url
  } catch (error: any) {
    return {
      errors: {
        message: error.message
      }
    }
  }
}