import React from  'react';
import './edit-comment.css';

const EditComponent = ({data, editedValue, setEditedValue, editComment}) => (
    <div>
        <div>
            <input type="text" className="input-style" placeholder="Edit"  defaultValue={data.commentData} onChange={event=> setEditedValue(event.target.value)}/>
        </div>
        <div className= "button-style">
            <button onClick={()=> editComment(editedValue, data)}>Save</button>
        </div>
    </div>
);

export default EditComponent;