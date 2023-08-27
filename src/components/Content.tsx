import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "~/utils/api";
import { useState } from "react";

type Topic = RouterOutputs['topic']['getAll'][0]

const Content: React.FC = () => {
    const { data: sessionData } = useSession()
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
    const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
        undefined,
        {
            enabled: sessionData?.user !== undefined,
            onSuccess: (data) => {
                setSelectedTopic(selectedTopic! ?? data[0] ?? null)
            }
        }
    )

    const createTopic = api.topic.create.useMutation({
        onSuccess: () => {
            refetchTopics()
        }
    })

    return <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
        <div className="px-2">
            <div className="menu rounded-box w-56 bg-base-100 p-2">
                {topics?.map((topic) => (
                    <li key={topic.id}>
                        <a onClick={(e) => {
                            e.preventDefault()
                            setSelectedTopic(topic)
                        }} href="#">
                            {topic.title}
                        </a>
                    </li>
                ))}
            </div>
            <div className="divider"></div>
            <input
                placeholder="New Topic"
                className="input-bordered input input-sm w-full"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        createTopic.mutate({
                            title: e.currentTarget.value
                        })
                        e.currentTarget.value = ""
                    }
                }}
                type="text" />
        </div>
        <div className="cols-span-3"></div>
    </div>
}

export default Content