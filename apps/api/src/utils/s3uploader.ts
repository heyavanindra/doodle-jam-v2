import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, type S3ClientConfig, PutObjectCommand } from '@aws-sdk/client-s3';
import { configs } from '../configs/configs.js';

// Create the config obj with credentials
// Always use environment variables or config files
// Don't hardcode your keys into code
const config: S3ClientConfig = {
  credentials: {
    accessKeyId: configs.AWS_ACCESS_KEY_ID,
    secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
  },
  region: configs.AWS_BUCKET_REGION,
};

const client = new S3Client(config);

interface SignedUrlInterface {
  fileName: string;
}

async function getSignedFileUrl(data: SignedUrlInterface): Promise<string> {
  // Instantiate the GetObject command,
  // a.k.a. specific the bucket and key
  const command = new PutObjectCommand({
    Bucket: configs.AWS_BUCKET,
    Key: data.fileName,
  });

  // await the signed URL and return it
  return await getSignedUrl(client, command, { expiresIn: 60 * 60 * 24 });
}

export { getSignedFileUrl };
