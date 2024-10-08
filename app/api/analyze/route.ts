import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    const { tweet } = await req.json()

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant that analyzes tweets and provides structured data and tags.",
            },
            {
                role: "user",
                content: `Analyze the following tweet and provide a structured analysis with tags:\n\n${tweet.text}`,
            },
        ],
    })

    const analysis = completion.choices[0].message.content

    return NextResponse.json({ analysis })
}