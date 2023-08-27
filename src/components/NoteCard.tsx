import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { type RouterOutputs } from '~/utils/api'

type Note = RouterOutputs['note']['getAll'][0]

const NoteCard = ({
    note,
    onDelete
}:{
    note: Note,
    onDelete: () => void
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true)
  return (
    <div className='card mt-5 border-gray-400 bg-base-200 shadow-xl'>
      <div className="card-body m-0 p-3">
        <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`collapse-arrow ${isExpanded? "collapse-open":""} collapse`}
        >
            <div className="collapse-title text-xl font-bold">{note.title}</div>
            <div className="collapse-content">
                <article className="prose lg:prose-xl">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                </article>
            </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
            <button
            onClick={onDelete}
             className="btn-xs btn-warning btn px-5">
                Delete
            </button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard
