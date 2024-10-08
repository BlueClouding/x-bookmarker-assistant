import { Suspense } from 'react'
import Header from '@/components/Header'
import AuthButton from '@/components/AuthButton'
import BookmarkList from '@/components/BookmarkList'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="mt-8">
        <AuthButton />
        <Suspense fallback={<div>Loading bookmarks...</div>}>
          <BookmarkList />
        </Suspense>
      </main>
    </div>
  )
}