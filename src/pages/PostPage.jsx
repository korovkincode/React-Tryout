import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPost, isPostLoading, errorPost] = useFetching(async (id) => {
        const response = await PostService.getPost(id);
        setPost(response.data);
    });
    const [fetchComments, isCommentsLoading, errorComments] = useFetching(async (id) => {
        const response = await PostService.getComments(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPost(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {post.id}</h1>
            {isPostLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}> <Loader /> </div>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Комментарии</h1>
            {isCommentsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}> <Loader /> </div>
                : <div>
                    {comments.map((comm) =>
                        <div key={comm.id} style={{marginTop: "15px"}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                  </div>
            }
        </div>
    )
}

export default PostPage;