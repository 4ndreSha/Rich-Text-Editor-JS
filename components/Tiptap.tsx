"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toolbar } from "./Toolbar"
import Heading from "@tiptap/extension-heading"
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import React from 'react'

export default function Tiptap({
    description,
    onChange,
}: {
    description: string
    onChange: (richText: string) => void
}) {
    const editor = useEditor({
        extensions: [StarterKit.configure({}),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-xl font-bold",
                    levels: [2],
                },
            }), OrderedList.configure({
                keepAttributes: true,
                keepMarks: true,
              }), Document, Paragraph, Text, ListItem],
        content: description,
        editorProps: {
            attributes: {
                class:
                    "rounded-md border min-h-[150px] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        },
    })

    return (
        <div className="min-h-[150px]">
            <Toolbar editor={editor} />
            <EditorContent placeholder="Your description" editor={editor} />
        </div>
    )
}