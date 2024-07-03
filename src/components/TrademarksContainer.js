import React from 'react'
import trademarks from '../data/trademarksIcons.json'
import './style/trademarks-container.css'

function TrademarksContainer() {
    return (
        <div className='trademarks-parent-container full-width'>
            <p>Sponsored by</p>
            <div className='flex' style={{justifyContent: "center"}}><div className='trademarks-child-container'><div className='trademarks-wrapper'>

                {trademarks.map(trademark => 
                    <a href={`/trademark-search/${trademark.name}/none`} className='pointer' title='Click to start shopping'>{trademark.name}</a>
                )}
            </div></div></div>
        </div>
    )
}

export default TrademarksContainer