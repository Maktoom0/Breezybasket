import React from 'react'

import './style/how-to-container.css'

function HowToContainer() {
    return (
        <div className='how-to-cont flex align-items'>
            <div>
                <p>add to cart</p>
                <p>simply add your yummy snacks to the cart even if you are on the sofa!</p>
                <i className="fa-solid fa-plus"></i>
            </div>

            <div>
                <p>order</p>
                <p>go to the cart and order your yummy snacks</p>
                <i className="fa-solid fa-cart-shopping"></i>
            </div>

            <div>
                <p>free shipping</p>
                <p>you'll get a free shipping if your cart total is more than 100EGP</p>
                <i className="fa-solid fa-hand-holding-dollar"></i>
            </div>

            <div>
                <p>fast shipping</p>
                <p>you'll recieve your products before you get up from the sofa</p>
                <i className="fa-solid fa-truck"></i>
            </div>

            <div>
                <p>enjoy</p>
                <p>enjoy eating your yummy delicious crunchy snacks</p>
                <i className="fa-solid fa-burger"></i>
            </div>
        </div>
    )
}

export default HowToContainer