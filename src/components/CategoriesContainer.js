import React from 'react'

import './style/categories-container.css'
let categoriesImagesArray = [
    {name: "chips", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/chips.png"},
    {name: "crisps", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/crisps.jpg"},
    {name: "biscuits", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/biscuits.jpg"},
    {name: "juices", src: "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/categories-images/juices.png"}
]

function CategoriesContainer() {
    return (
        <div className='categories-container flex'>
            {categoriesImagesArray.map(element => 
                <a href={`#/trademark-search/none/${element.name}`} className='pointer relative'>
                    <img className='full-width absolute' src={element.src} alt={element.name} />
                    <p className='absolute'>{element.name}</p>
                </a>
            )}
        </div>
    )
}

export default CategoriesContainer