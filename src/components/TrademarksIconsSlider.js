import trademarksIcons from '../data/trademarksIcons.json'
import './style/trademarks-icons-slider.css'

let TrademarksIconsObj = trademarksIcons.map((element, index) => ({ id: index, value: element }));
const slideVal = (-((130 * 2 * trademarksIcons.length) - window.outerWidth)) + "px";
document.documentElement.style.setProperty('--slide-val', slideVal);

export default function TrademarksIconsSlider(){

    let trademarksIconsElements = TrademarksIconsObj.map((trademark) => 
    <a href={`/trademark/${trademark.value.name}`} key={trademark.id} className='trademark-icon-container flex align-items'>
        <img src={trademark.value.src} alt={trademark.value.name.charAt(0).toUpperCase() + trademark.value.name.slice(1).toLowerCase()} title={trademark.value.name.charAt(0).toUpperCase() + trademark.value.name.slice(1).toLowerCase()} className='full-width' />
    </a>);
    
    return (
        <div className="trade-marks-icons-container full-width relative">
            <div className="wrapper full-height flex align-items absolute">
                {trademarksIconsElements}
                {trademarksIconsElements}
            </div>
        </div>
    );
};