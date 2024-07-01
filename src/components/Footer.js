import React from 'react'
import trademarks from "../data/trademarksIcons.json"
import categories from '../data/categories.json'
import './style/footer.css'

function Footer() {
  return (
    <footer className='relative flex'>
        <div className='footer-section'>
            <p>trademarks</p>
            <div>{trademarks.map(trademark => <a href={`/trademark-search/${trademark.name}/none`}>{trademark.name}</a>)}</div>
        </div>

        <div className='footer-section'>
            <p>categories</p>
            {categories.map(category => <a href={`/trademark-search/none/${category}`}>{category}</a>)}
        </div>

        <div className='footer-section'>
            <p>others</p>
            <a href='/'>home</a>
            <a href='/cart'>cart</a>
            <a href='/favorites'>favorites</a>
        </div>

        <div className='absolute bottom full-width'>
            <div>
                <div className='copyright-sentence'>&copy; all rights reserved 2024</div>
                <div className='maktoom'>
                    powered by <a href='/'>matkoom</a>
                </div>
            </div>
            <div className='icons'>
                <a href='facebook.com'><i className="fa-brands fa-facebook"></i></a>
                <a href='instagram.com'><i className="fa-brands fa-instagram"></i></a>
                <a href='https://github.com/Maktoom0'><i className="fa-brands fa-github"></i></a>
            </div> 
        </div>
    </footer>
  )
}

export default Footer