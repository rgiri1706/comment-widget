import React, { useState } from 'react';
import EditComponent from '../edit-comment/edit-comment';
import user from "./user.png";
import heart from "./heart.svg";
import like from "./like.svg";
import "./comment-component.css";

const CommentComponent = () => {
    const [comments, readComment] = useState([]);
    const [newComment, updateComment] = useState('');
    const [editedValue, setEditedValue] = useState('');
    const [editField, setField] = useState('');
    const [id, setId] = useState(1);
    const [likeId, setLike] = useState('');
    const addComment =(comment)=>{
        if(newComment.length < 200){
            setId(id+1);
            const data = {
                Id:id,
                commentData: comment,
                edit: false
            };
            readComment([...comments, data]);
            updateComment('');
        }
    }

    const deleteComment =(ele)=>{
        let temp = comments.filter(e=> e.Id !== ele.Id);
        readComment(temp);
    }

    const editComment=(updatedComment, ele)=>{
        comments.forEach(e=> {
            if(e.Id === ele.Id){
                e.commentData = updatedComment
            }
        });
        readComment(comments);
        setField('');
    }

    return (
        <div>
            <div>
                <input type="text" className="input-style" placeholder="Join the discussion...(max 200 characters)" value={newComment} onChange={(event)=> updateComment(event.target.value)} />
            </div>
            <div className= "button-style">
                <button onClick={()=> addComment(newComment)} disabled={!newComment} className={!newComment ? 'grey-button' : ''}>Add Comment</button>
            </div>
            {newComment.length > 200 && <div className= "error-text">
                Please keep the word limit
            </div>}
            <div className="comment-area">
                {comments.length > 0 ? (
                    <div className="comment-details">
                        {comments.map((ele, index)=>{
                            return (
                                <div className="margin-comment" key={index}>
                                    <div className="name">
                                        Name+{ele.Id}
                                    </div>
                                    {ele.Id===editField ? (
                                       <EditComponent data={ele} editedValue={editedValue} setEditedValue={setEditedValue} editComment={editComment} />
                                    ):(
                                        <div className= "comment-details-user">
                                            <div>
                                                <img src={user} alt="user profile" width="60" height="60"/>
                                            </div>
                                            <div className="mg-left-4">
                                                {ele.commentData}
                                            </div>
                                        </div>
                                    )}
                                    <div className="user-actions">
                                        <div className="edit-name">
                                            {likeId === ele.Id ? (
                                                <img src={heart} alt="user profile" width="30" height="30" onClick={()=> setLike('')}/>
                                            ): (
                                                <img src={like} alt="user profile" width="30" height="30" onClick={()=> setLike(ele.Id)}/>
                                            )}
                                        </div>
                                        <div className="edit-name" onClick={()=> deleteComment(ele)}>
                                            Delete
                                        </div>
                                        <div className="edit-name" onClick={()=> setField(ele.Id)}>
                                            Edit
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ): (
                <div>
                    No Comment
                </div> 
                )}
            </div>
        </div>
    );
};

export default CommentComponent;