import { NextRequest, NextResponse } from 'next/server'

export function GET(
  req: NextRequest,
) {
  return NextResponse.json(
    { data: 'Hello, world!', message: 'fetch successful' },
    { status: 200 })
}