import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'view' or 'click'

    // We intentionally don't await the body parsing if it's a simple view
    const body = type === 'click' ? await request.json() : null;

    // Fire and forget strategy — log locally, respond quickly
    if (type === 'view') {
      // In a real production setup you can read headers like headers.get('user-agent') 
      // or headers.get('x-vercel-ip-country') to store device and country.
      await prisma.linkPageView.create({
        data: {
          referrer: request.headers.get('referer') || null,
          device: null, // Optional: parse user agent here
          country: request.headers.get('x-vercel-ip-country') || null,
        }
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (type === 'click') {
      if (!body?.title || !body?.url) {
        return NextResponse.json({ error: 'Missing title or url' }, { status: 400 });
      }

      await prisma.linkClick.create({
        data: {
          linkTitle: body.title,
          linkUrl: body.url,
        }
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Even if analytics fail, we return 200 to clients so we don't break the UI
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
