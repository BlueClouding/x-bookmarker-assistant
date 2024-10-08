"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Bookmark } from '@/lib/types'

export default function BookmarkList() {
  const { data: session } = useSession()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (session) {
      fetchBookmarks()
    }
  }, [session])

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks')
      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks')
      }
      const data = await response.json()
      setBookmarks(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookmarks",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const analyzeBookmark = async (bookmarkId: string) => {
    try {
      const response = await fetch(`/api/analyze/${bookmarkId}`, { method: 'POST' })
      if (!response.ok) {
        throw new Error('Failed to analyze bookmark')
      }
      const data = await response.json()
      toast({
        title: "Analysis Complete",
        description: data.analysis,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze bookmark",
        variant: "destructive",
      })
    }
  }

  if (!session) {
    return <p>Please sign in to view your bookmarks.</p>
  }

  if (loading) {
    return <p>Loading bookmarks...</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-2">{bookmark.text}</CardTitle>
            <CardDescription>{new Date(bookmark.created_at).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="line-clamp-3">{bookmark.text}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => analyzeBookmark(bookmark.id)} className="w-full">
              Analyze
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}