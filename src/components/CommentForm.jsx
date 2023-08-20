import React from "react";
import { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const CommentForm = ({create}) => {
    const [comm, setComm] = useState({email: "", body: "", likes: 0, dislikes: 0});
    
    const addNewComm = (e) => {
        e.preventDefault();
        create({...comm});
        setComm({email: "", body: "", likes: 0, dislikes: 0});
    }
    
    return (
        <form>
            <MyInput type="text" placeholder="Ваша почта"
            value={comm.email} onChange={e => setComm({...comm, email: e.target.value})} />
            <MyInput type="text" placeholder="Комментарий"
            value={comm.body} onChange={e => setComm({...comm, body: e.target.value})} />
            <MyButton onClick={addNewComm}>Добавить комментарий</MyButton>
        </form>
    )
}

export default CommentForm;