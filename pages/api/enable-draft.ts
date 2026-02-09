import { client } from '@/sanity/lib/client';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(500).json({ message: 'Missing request URL' });
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({
      token: process.env.SANITY_VIEWER_TOKEN,
    }),
    req.url,
  );

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location: redirectTo });
  res.end();
}
