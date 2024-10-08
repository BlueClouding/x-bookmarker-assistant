import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BookmarkList({ bookmarks, onSelectTweet }) {
  return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Bookmarks</h3>
        {bookmarks.map((tweet) => (
            <Card key={tweet.id}>
              <CardContent className="p-4">
                <p>{tweet.text}</p>
                <Button onClick={() => onSelectTweet(tweet)} className="mt-2">
                  Analyze
                </Button>
              </CardContent>
            </Card>
        ))}
      </div>
  )
}