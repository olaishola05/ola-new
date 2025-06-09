import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/app/lib/prisma';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: NextRequest) {
  try {
    const { publicId, projectId, type } = await request.json();

    if (!publicId || !projectId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      return NextResponse.json({ error: "Failed to delete image on Cloudinary" }, { status: 500 });
    }

    if (type === "cover") {
      await prisma.project.update({
        where: { id: projectId },
        data: { coverImgUrl: null },
      });
    } else if (type === "image") {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      const updatedImages = (project?.images || []).filter(
        (img) => !img.includes(publicId)
      );

      await prisma.project.update({
        where: { id: projectId },
        data: { images: updatedImages },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DB image deletion error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
