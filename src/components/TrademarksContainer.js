import { useParams } from 'react-router-dom';
import React from 'react'
import trademarks from '../data/trademarksIcons.json'
import './style/trademarks-container.css'

function TrademarksContainer() {
    return (
        <div className='trademarks-parent-container full-width'>
            <p>Sponsored by</p>
            <div className='flex' style={{justifyContent: "center"}}><div className='trademarks-child-container'>
                {trademarks.map(trademark => 
                    <a href={`/trademark/${trademark.name}`} className='trademark-container pointer' title='Click to start shopping'>{trademark.name}</a>
                )}
            </div></div>
        </div>
    )
}

export default TrademarksContainer