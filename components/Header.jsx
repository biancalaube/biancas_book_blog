import React, { useState, useEffect} from 'react';
import Link from 'next/link';
//const categories = [{name: 'React', slug: 'react'}, {name: 'Web Development', slug: 'web-dec'}];
import { getCategories } from '../services';

// this is the header at the top of the webpage that has the title and the different categories
const Header = () => {
    const [categories, setcategories] = useState([]);
    // this gets the list of categories using gql and contects to graphcms
    useEffect(() => {
        getCategories()
            .then((newCategories) => setcategories(newCategories))
    }, []);

    // the links around the the span elements allow them to be clickable to the webpage
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-white py-8">
                <div className="md:float-left block">
                    <Link href="/" >
                        <span className="cursor-pointer font-bold text-4xl text-white whitespace-pre text-justify text-shadow">
                            Bianca's Book Blog
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer text-white text-xl text-shadow">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header
