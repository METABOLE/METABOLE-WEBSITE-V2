import { fetchDataInfos } from '@/services/data.service';
import { fetchProjects } from '@/services/projects.service';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const draftMode = !!(
    req.headers.cookie?.includes('__prerender_bypass') ||
    req.headers.cookie?.includes('__next_preview_data')
  );

  try {
    const [projects, dataInfos] = await Promise.all([
      fetchProjects({ draftMode }),
      fetchDataInfos({ draftMode }),
    ]);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json({
      projects,
      dataInfos,
      draftMode: projects.draftMode || dataInfos.draftMode || draftMode,
    });
  } catch (error) {
    console.error('[api/global-data]', error);
    return res.status(500).json({ message: 'Failed to fetch global data' });
  }
}
