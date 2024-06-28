import './style/message.css'

export default function Message(props){
    return (
        <div className="message flex align-items full-width">
            {props.children}
            <button className='close-message btn absolute pointer' onClick={() => {document.querySelector(".message").classList.remove("message-activated")}}><i className="fa-solid fa-xmark"></i></button>
        </div>
    );
};