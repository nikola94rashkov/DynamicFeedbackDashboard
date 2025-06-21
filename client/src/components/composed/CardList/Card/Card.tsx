import type {Feedback} from "@/types/feedback.types.ts";
import './Card.scss'

export const Card = (props: Feedback) => {
    const { name, status, category, content, _id } = props;

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

            <div className="card__actions">
                <span>edit {_id}</span>
                <br/>
                <span>delete {_id}</span>
            </div>
        </div>
    )
}