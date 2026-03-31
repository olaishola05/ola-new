import { NextResponse } from 'next/server';
import { getSearchIndex } from '@/lib/posts';

export async function GET() {
  try {
    const searchIndex = await getSearchIndex();
    return NextResponse.json(searchIndex);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch search index' }, { status: 500 });
  }
}
