import type {Feedback} from "@/types/feedback.types.ts";
import './Card.scss'
import {Button, NavButton} from "@/components/ui";
import {useSelector} from "react-redux";
import type {RootState} from "@/store/store.ts";
import {useDeleteFeedbackMutation} from "@/store/feedback/feedbackApiSlice.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

export const Card = (props: Feedback) => {
    const { author, name, status, category, content, _id } = props;
    const { user } = useSelector((state: RootState) => state.authSlice)
    const [deleteFeedback] = useDeleteFeedbackMutation()
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!_id) return

        const isConfirmed = confirm("Are you sure you want to delete this feedback? This action cannot be undone.");

        if (!isConfirmed) return;

        try {
            const response = await deleteFeedback(_id);
            console.log('Delete successful:', response);

            toast.success('Delete successful');
            navigate('/');
        } catch (error) {
            toast.success('Error deleting feedback:');
            console.error(error);
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
                user && user?._id === author?._id && (
                    <div className="card__actions">
                        <NavButton text='Edit' to={`/edit/${_id}`}/>
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