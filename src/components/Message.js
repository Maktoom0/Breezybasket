import './style/message.css'

export default function Message({content = "message", iconClass = ""}){
    return (
        <div className="message message-activated absolute flex align-items">
            <p>{content}</p>
            <i className={iconClass}></i>
        </div>
    );
};