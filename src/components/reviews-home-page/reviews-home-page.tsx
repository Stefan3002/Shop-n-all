import './reviews-home-page.css'
import * as React from "react";
// @ts-ignore
import ReviewHomePage from "../review-home-page/review-home-page.tsx";
import {useState} from "react";
// @ts-ignore
import reviewHomePage from "../review-home-page/review-home-page.tsx";



const ReviewsHomePage: React.FC = () => {
    const [index, setIndex] = useState(0)

    const reviews = [
        {
            id: 1,
            img: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            name: 'John Doe',
            content: 'This is one of the best websites I have ever used.',
            color: 'orange'
        },
        {
            id: 2,
            img: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            name: 'Jane Doe',
            content: 'You can find all sorts of great items on this site. Truly recommend it.',
            color: 'crimson'
        },
        {
            id: 3,
            img: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            name: 'Jack Doe',
            content: 'This shop is awesome!',
            color: 'lightblue'
        }
    ]


    const nextReview = (): void => {
        if(index < reviews.length - 1)
            setIndex(index + 1)
        else
            setIndex(0)
    }
    const prevReview = (): void => {
        if(index > 0)
            setIndex(index - 1)
        else
            setIndex(reviewHomePage.length - 1)
    }

    return (
        <div className='reviews-home-page-container'>
            <i onClick={prevReview} className="left-caret fa fa-3x fa-solid fa-square-caret-left"></i>
              <ReviewHomePage key={reviews[index].id} data={reviews[index]} />
            <i onClick={nextReview} className="right-caret fa fa-3x fa-solid fa-square-caret-right"></i>
        </div>
    )
}
export default ReviewsHomePage