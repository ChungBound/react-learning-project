"use client"

import { useEffect, useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  language: string
  children: string
  className?: string
}

export default function CodeBlock({ language, children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "0.9rem",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
