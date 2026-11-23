import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const region = process.env.AWS_REGION || 'ap-south-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET_NAME || 'utsavnest-uploads';

export const isAwsConfigured = Boolean(accessKeyId && secretAccessKey);

let s3Client: S3Client | null = null;

if (isAwsConfigured) {
  s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  });
}

export async function generatePresignedUploadUrl(fileName: string, contentType: string) {
  if (!isAwsConfigured || !s3Client) {
    console.warn('[AWS S3] AWS credentials not configured in .env.local. Using fallback local storage simulator.');
    return {
      uploadUrl: `/api/upload/mock?file=${encodeURIComponent(fileName)}`,
      fileUrl: `/images/${encodeURIComponent(fileName)}`,
      mode: 'mock',
    };
  }

  const key = `uploads/${Date.now()}-${fileName.replace(/\s+/g, '_')}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  try {
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    return {
      uploadUrl,
      fileUrl,
      key,
      mode: 'aws_s3',
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown S3 error';
    console.error('[AWS S3 Presign Error]', message);
    throw err;
  }
}
