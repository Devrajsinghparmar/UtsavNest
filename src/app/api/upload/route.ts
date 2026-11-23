import { NextResponse } from 'next/server';
import { generatePresignedUploadUrl, isAwsConfigured } from '@/lib/s3';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, contentType } = body;

    if (!fileName) {
      return NextResponse.json(
        { success: false, error: 'File name is required' },
        { status: 400 }
      );
    }

    const result = await generatePresignedUploadUrl(
      fileName,
      contentType || 'image/jpeg'
    );

    return NextResponse.json({
      success: true,
      isAwsConfigured,
      ...result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
