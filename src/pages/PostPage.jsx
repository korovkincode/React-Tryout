import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import CommentForm from "../components/CommentForm";

const PostPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [modal, setModal] = useState(0);
    const [fetchPost, isPostLoading, errorPost] = useFetching(async (id) => {
        const response = await PostService.getPost(id);
        setPost(response.data);
    })
    const [fetchComments, isCommentsLoading, errorComments] = useFetching(async (id) => {
        const response = await PostService.getComments(id);
        for (let ind = 0; ind < response.data.length; ind++) {
            response.data[ind].likes = 0;
            response.data[ind].dislikes = 0;
        }
        setComments(response.data);
    })

    useEffect(() => {
        fetchPost(params.id);
        fetchComments(params.id);
    }, [])

    const scoreComment = (comm, val) => {
        for (let ind = 0; ind < comments.length; ind++) {
            if (comm.id !== comments[ind].id) continue;
            if (val === 1) comments[ind].likes++;
            else comments[ind].dislikes++;
        }
        setComments([...comments]);
    }

    const createComment = (newComm) => {
        setComments([...comments, newComm]);
        setModal(0);
    }

    return (
        <div>
            <MyModal visible={modal} setVisible={setModal}>
                <CommentForm create={createComment} />
            </MyModal>
            <h1>Вы открыли страницу поста с ID = {post.id}</h1>
            {isPostLoading
                ?   <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}> <Loader /> </div>
                :   <div className="post">
                        <div className="post__content">
                            <strong>{post.id}. {post.title}</strong>
                            <div>
                                {post.body}
                            </div>
                        </div>
                    </div>
            }
            <h1 style={{marginTop: "30px"}}>Комментарии</h1>
            {isCommentsLoading
                ?   <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}> <Loader /> </div>
                :   <div>
                        {[...comments].sort((a, b) => a.likes - a.dislikes < b.likes - b.dislikes ? 1 : -1).map((comm, index) =>
                                <div key={index} className="comment">
                                    <div className="comment__content">
                                        <h3>{comm.email}</h3>
                                        <div>{comm.body}</div>
                                    </div>
                                    <div className="post__btns">
                                        {comm.likes
                                            ?   <MyButton btnBorder="white" onClick={() => scoreComment(comm, 1)}>👍 {comm.likes}</MyButton>
                                            :   <MyButton btnBorder="white" onClick={() => scoreComment(comm, 1)}>👍</MyButton>
                                        }
                                        {comm.dislikes
                                            ?   <MyButton btnBorder="white" onClick={() => scoreComment(comm, -1)}>👎 {comm.dislikes}</MyButton>
                                            :   <MyButton btnBorder="white" onClick={() => scoreComment(comm, -1)}>👎</MyButton>
                                        }
                                    </div>
                                </div>
                        )}
                    </div>
            }
            <MyButton onClick={() => setModal(1)} style={{marginTop: "10px"}}>Оставить комментарий</MyButton>
        </div>
    )
}

export default PostPage;