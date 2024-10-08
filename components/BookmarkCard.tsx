"use client"

import { useState } from 'react'
import { Bookmark } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BookmarkCardProps {
  bookmark: Bookmark
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{bookmark.author}</CardTitle>
        <CardDescription>{new Date(bookmark.date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{bookmark.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <a href={bookmark.tweetUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">View Tweet</Button>
        </a>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAnalysisVisible(true)}>View Analysis</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tweet Analysis</DialogTitle>
              <DialogDescription>
                AI-generated analysis of the tweet content
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p>{bookmark.analysis}</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}