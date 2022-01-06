// this component allows the user to submit a comment on a particular post
import React, {useState, useEffect, useRef} from 'react';
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    //useRef creates a direct reference to the value stored in the DOM
    // just updating this comment so it works i think
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    //always to the user to save their name and email if they want to make mulitple comments on the webpage
    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, []);

    //this functions runs when the user submits their comment
    const handleCommentSubmission = () => {
        setError(false);

        const {value: comment} = commentEl.current;
        const {value: name} = nameEl.current;
        const {value: email} = emailEl.current;
        const {checked: storeData} = storeDataEl.current;
        //checks to make sure all the fields are filled out correctly
        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = { name, email, comment, slug};

        //stores the name and email if the user wanted to website too
        if(storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }

        //this submits a comment calling the graphql query that will send the comment to grapgcms for review
        submitComment(commentObj)
            .then((res) => {
                setShowSuccessMessage(true);

                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            });
    }

    // textarea tag is a multi tag html control tag often used in forms for user input
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea 
                    ref={commentEl} 
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comment"
                    name="comment"
                />
            </div> 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input 
                    type="text"
                    ref={nameEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name"
                    name="name"
                />
                <input 
                    type="text"
                    ref={emailEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email"
                    name="email"
                />
            </div> 
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true"/>
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save my email and name for the next time I comment</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">ALl fields are required.</p>}
            <div className="mt-8">
                <button 
                    type="button" 
                    onClick={handleCommentSubmission}
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Post Comment
                </button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
            </div>
        </div>
    )
}

export default CommentsForm
