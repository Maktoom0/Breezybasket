import React from 'react'

import './style/categories-container.css'
let categoriesImagesArray = [
    {name: "chips", src: "https://post.healthline.com/wp-content/uploads/2022/04/potato-chips-basket-1296-728-header.jpg"},
    {name: "doritos", src: "https://assets.epicurious.com/photos/57447cbbe20d46c911c14201/master/pass/EP_05242016_flavored_tortilla_chips_.jpg"},
    {name: "cheetos", src: "https://www.allrecipes.com/thmb/ktNYZuo9iQE5zYTH7MK9KPRDmKA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7971390CaramelCheetos_closeup4x3-83536eb16cd845c7bdc436c5a8bd7d22.jpg"},
    {name: "chocolate", src: "https://www.lsa-conso.fr/mediatheque/6/7/5/000595576_896x598_c.jpg"},
    {name: "ice cream", src: "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg"},
    {name: "biscuits", src: "https://i.ytimg.com/vi/mXIaD-mC2QU/maxresdefault.jpg"}
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