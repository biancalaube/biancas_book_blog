/*
This component sets the author component on a the page that has one post 
it included the authors picture, name and bio
*/
//need something to push
import React from 'react';
import Image from 'next/image'; //is kinda like the Image tag but has more built in properties

//unoptimizied -> the source image will be served as-is instead of changing the quality, size or format
const Author = ({author}) => {
    return (
        <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20"> 
            <div className="absolute left-0 right-0 -top-14">
                <Image 
                    alt={author.name}
                    unoptimized
                    height="100px"
                    width="100px"
                    className="align-middle rounded-full"
                    src={author.photo.url}
                />
            </div>
            <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
            <p className="text-white text-lg">{author.bio}</p>
        </div>
    )
}

export default Author
