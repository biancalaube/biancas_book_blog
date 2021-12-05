import React from 'react';
import Link from 'next/link';
import logo from "./goodreadslogo.jpg";

// this is the footer that shows up on the bottom of each page
const Footer = () => {

    // the links around the the span elements allow them to be clickable to the webpage
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-t w-full inline-block border-white py-8">
                <div className="flex justify-center items-center space-x-6 block ">
                    <img
                            alt={'goodReadsLogo'}
                            width='30px'
                            height='30px'
                            src={'https://cdn.iconscout.com/icon/free/png-256/goodreads-2752175-2284992.png'} 
                    />
                    <Link href="https://www.goodreads.com/user/show/61397890-bianca-laube">
                        <span className="cursor-pointer font-semibold text-yellow-900">
                            Bianca's goodreads
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
