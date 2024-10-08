import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { TwitterApi } from 'twitter-api-v2'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session || !session.accessToken) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const client = new TwitterApi(session.accessToken as string)

  try {
    const bookmarks = await client.v2.bookmarks()
    res.status(200).json(bookmarks.data)
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    res.status(500).json({ error: 'Failed to fetch bookmarks' })
  }
}