import { memo } from "react"
import { useParams } from "react-router-dom";

const PostComponent = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div> id поста:
            {id}
            (пока что в разарботке)
        </div>
    )
}

export const Post = memo(PostComponent)