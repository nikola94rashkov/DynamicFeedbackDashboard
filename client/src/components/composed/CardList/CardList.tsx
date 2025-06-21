import type { FeedbackExtended } from "@/types/feedback.types.ts";
import { Card } from "./Card";

import './CardList.scss'

export const CardList = ({ cards } : { cards: FeedbackExtended[] })  => {
    return (
        <ul className='cards-list'>
            {cards.map(({author, name, content, status, category, _id}) => (
                <li key={_id}>
                    <Card author={author} name={name} content={content} status={status} category={category} _id={_id}/>
                </li>
            ))}
        </ul>
    )
}