import React, {useState} from 'react'
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from "@codemirror/language-data"

const NoteEditor = ({
    onSave
}: { onSave: (note: { title: string, content: string}) => void}) => {
    const [code, setCode] = useState<string>("")
    const [title, setTitle] = useState<string>("")
  return (
    <div className='card mt-5 border border-gray-200 bg-base-100 shadow-xl px-2'>
        <div className="card-body">
            <h2 className="card-title">
                <input type="text"
                placeholder='Note title'
                className="input-primary input input-lg w-full font-bold"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                 />
            </h2>
            <CodeMirror
            value={code}
            width='500px'
            height='30vh'
            minHeight='30vh'
            minWidth='100%'
            extensions={
               [
                markdown({base: markdownLanguage, codeLanguages: languages})
               ]
            }
            onChange={(value)=> setCode(value)}
            className='border border-gray-400'
            />

        </div>
        <div className="card-actions justify-end py-4">
            <button
            onClick={()=>{
                onSave({
                    title,
                    content: code
                })
                setCode("")
                setTitle("")
            }}
            className='btn-primary btn'
            disabled={title.trim().length === 0 || code.trim().length === 0}
            >
                save
            </button>
        </div>
    </div>
  )
}

export default NoteEditor