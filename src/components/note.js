import React from "react";

const Note = ({ title, content, onClick }) => {
    return (
        <div className="note">
            <div className="note-header">
                <div>
                    <p className="note-title">
                        {title}
                    </p>
                </div>
                <div>
                    <a href="#" className="close" onClick={onClick}>X</a>
                </div>
            </div>
            <div className="note-content">
                <p>{content}</p>
            </div>
        </div>
    )
}

export { Note }
