import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import { saveAs } from "file-saver"
import { pdf } from "@react-pdf/renderer"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: { padding: 30 },
    text: { marginBottom: 10 },
})

const PDFDocument = ({ content }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.text}>{content}</Text>
            </View>
        </Page>
    </Document>
)

export default function AnalysisResult({ tweet, analysis }) {
    const [exportFormat, setExportFormat] = useState("markdown")

    const handleExport = async () => {
        const content = `# Tweet Analysis\n\nOriginal Tweet: ${tweet.text}\n\n${analysis}`

        if (exportFormat === "markdown") {
            const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
            saveAs(blob, "tweet_analysis.md")
        } else if (exportFormat === "pdf") {
            const blob = await pdf(<PDFDocument content={content} />).toBlob()
            saveAs(blob, "tweet_analysis.pdf")
        }
    }

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">Analysis Result</h3>
                <ReactMarkdown>{analysis}</ReactMarkdown>
                <div className="flex space-x-2">
                    <select
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="markdown">Markdown</option>
                        <option value="pdf">PDF</option>
                    </select>
                    <Button onClick={handleExport}>Export</Button>
                </div>
            </CardContent>
        </Card>
    )
}