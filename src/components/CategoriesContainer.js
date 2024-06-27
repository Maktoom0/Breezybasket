import React from 'react'

import './style/categories-container.css'
let categoriesImagesArray = [
    {name: "chips", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/chips.webp"},
    {name: "doritos", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/doritos.webp"},
    {name: "cheetos", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/cheetos.jpg"},
    {name: "chocolate", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/chocolate.jpg"},
    {name: "ice cream", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/ice-cream.webp"},
    {name: "biscuits", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/biscuits.jpg"}
]

function CategoriesContainer() {
    return (
        <div className='categories-container flex'>
            {categoriesImagesArray.map(element => 
                <a href={`/category/${element.name}`} className='category-provider pointer'>
                    <img className='full-width' src={element.src} alt={element.name} />
                    <p className='absolute'>{element.name}</p>
                </a>
            )}
        </div>
    )
}

export default CategoriesContainer