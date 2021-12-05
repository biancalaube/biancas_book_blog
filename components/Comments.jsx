// this component prints the comments stored for a particular post from graphcms
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';

const Comments = ({slug}) => {
    const [comments, setComments] = useState([]);

    //gets the comment from graphcms from use a grqphql query which allows us to show them after the chosen post 
    useEffect(() => {
       getComments(slug)
        .then((result) => setComments(result));
    }, []);

    //momment keeps track of when the comment was made
    return (
        <>
            {comments.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                        {comments.length}
                        {' '}
                        Comments
                    </h3>
                    {/* using .map allows us to go through one comment at a time */}
                    {comments.map((comment) => (
                        <div key={comment.createdAt} className="border-b border-gray-100 mb-4 pb-4">
                            <p className="mb-4">
                                <span className="font-semibold">{comment.name}</span>
                                {' '}
                                on
                                {' '}
                                {moment(comment.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <p className="whitespace-pre-line text-gray-600 w-full">
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Comments
