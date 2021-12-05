//this component allows us to build the categories tab on the right side of our website which allows us to click and go to the different categories
// that we have in my blog

import React, { useState, useEffect} from 'react';
import Link from 'next/link';

//this import gets the graphql query that conects to graphcms to get the categories we have made from there
import { getCategories } from '../services';

const Categories = () => {
    const [categories, setcategories] = useState([]); //always to automatically upadate and gets the dynamic categories from sql

    //we use useEffect to render the categories list on our website
    useEffect(() => {
        getCategories()
            .then((newCategories) => setcategories(newCategories))
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Categories
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="cursor-pointer block pb-3 mb-3">
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default Categories
