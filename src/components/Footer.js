import React from 'react'
import trademarks from "../data/trademarksIcons.json"
import categories from '../data/categories.json'
import './style/footer.css'

function Footer() {
  return (
    <footer className='relative flex'>
        <div className='footer-section'>
            <p>brands</p>
            <div>{trademarks.map(trademark => <a href={`/breezybasket/trademark-search/${trademark.name}/none`}>{trademark.name}</a>)}</div>
        </div>

        <div className='footer-section'>
            <p>categories</p>
            {categories.map(category => <a href={`/breezybasket/trademark-search/none/${category}`}>{category}</a>)}
        </div>

        <div className='footer-section'>
            <p>others</p>
            <a href='/breezybasket/'>home</a>
            <a href='/breezybasket/cart'>cart</a>
            <a href='/breezybasket/favorites'>favorites</a>
        </div>

        <div className='absolute bottom full-width'>
            <div>
                <div className='copyright-sentence'>&copy; all rights reserved 2024</div>
                <div className='maktoom'>
                    powered by <a href='/breezybasket/'>matkoom</a>
                </div>
            </div>
            <div className='icons'>
                <a href='/breezybasket'><i className="fa-brands fa-facebook"></i></a>
                <a href='/breezybasket'><i className="fa-brands fa-instagram"></i></a>
                <a href='/breezybasket'><i className="fa-brands fa-github"></i></a>
            </div> 
        </div>
    </footer>
  )
}

export default Footer