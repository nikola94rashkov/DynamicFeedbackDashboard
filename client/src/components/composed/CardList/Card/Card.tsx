import type {Feedback} from "@/types/feedback.types.ts";
import './Card.scss'
import {Button} from "@/components/ui";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {useDeleteFeedbackMutation} from "@/store/feedback/feedbackApiSlice.ts";

export const Card = (props: Feedback) => {
    const { user } = useSelector((state: RootState) => state.authSlice)
    const [deleteFeedback] = useDeleteFeedbackMutation()
    const { author, name, status, category, content, _id } = props;

    const handleDelete = async () => {
        if (!_id) return

        try {
            await deleteFeedback(_id);
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    return (
        <div className='card'>
            <div className="card__head">
                <span className={`card__status card__status--${status}`}>
                    {status}
                </span>

                <h6 className="card__name">
                    {name}
                </h6>

                <span className="card__category">
                    {category}
                </span>
            </div>

            <div className="card__body">
                <p>{content}</p>
            </div>

            {
                user?._id === author?._id && (
                    <div className="card__actions">
                        <Button>Edit</Button>
                        <Button onClick={()=> {
                            console.log('click')
                            handleDelete()
                        }}>Delete</Button>
                    </div>
                )
            }
        </div>
    )
}