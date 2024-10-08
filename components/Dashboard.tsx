'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import BookmarkList from "./BookmarkList"
import AnalysisResult from "./AnalysisResult"

export default function Dashboard({ user }) {
    const [bookmarks, setBookmarks] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTweet, setSelectedTweet] = useState(null)
    const [analysis, setAnalysis] = useState(null)

    useEffect(() => {
        fetchBookmarks()
    }, [])

    const fetchBookmarks = async () => {
        setLoading(true)
        const response = await fetch("/api/bookmarks")
        const data = await response.json()
        setBookmarks(data)
        setLoading(false)
    }

    const analyzeTweet = async (tweet) => {
        setSelectedTweet(tweet)
        setAnalysis(null)
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tweet }),
        })
        const data = await response.json()
        setAnalysis(data)
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>
            {loading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <BookmarkList bookmarks={bookmarks} onSelectTweet={analyzeTweet} />
            )}
            {selectedTweet && analysis && (
                <AnalysisResult tweet={selectedTweet} analysis={analysis} />
            )}
        </div>
    )
}