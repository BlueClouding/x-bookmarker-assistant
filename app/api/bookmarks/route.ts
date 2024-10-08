import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const response = await fetch(
      "https://api.twitter.com/2/users/me/bookmarks?tweet.fields=text",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
  )

  const data = await response.json()
  return NextResponse.json(data.data)
}