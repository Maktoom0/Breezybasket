import './style/message.css'

export default function Message(props){
    return (
        <div className="message flex align-items full-width">
            {props.children}
            <button className='close-message btn absolute pointer' onClick={() => {document.querySelector(".message").classList.remove("message-activated")}}><i class="fa-regular fa-circle-xmark"></i></button>
        </div>
    );
};