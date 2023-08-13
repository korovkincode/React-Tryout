import React, { useEffect, useMemo, useState, useRef } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/Pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [modal, setModal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pagesArray, setPagesArray] = useState([]);
    const lastElement = useRef();

    console.log(totalPages, page, pagesArray, posts);

    const [fetсhPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        if (page > 1) {
            // setPosts([...posts, ...response.data]);
            // setAllPosts([...allPosts, ...response.data]);
            setPosts(response.data);
            setAllPosts(response.data);
        } else {
            setPosts(response.data);
            setAllPosts(response.data);
        }
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPageCount(totalCount, limit));
    });

    /* useObserver(lastElement, (page < totalPages && posts.length === allPosts.length), isPostsLoading, () => {
        setPage(page + 1);
    }); */

    useEffect(() => {
        fetсhPosts()
    }, [page, limit]);

    useMemo(() => {
        setPagesArray(getPagesArray(totalPages));
    }, [totalPages]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setAllPosts([...allPosts, newPost]);
        setModal(0);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.title !== post.title));
        setAllPosts(allPosts.filter(p => p.title !== post.title));
    }

    const sortPosts = (sort) => {
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
        setAllPosts([...allPosts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    const searchPost = (query) => {
        if (query === "") setPosts(allPosts);
        else setPosts(allPosts.filter(p => (query === "") || (p.title.toLowerCase().includes(query.toLowerCase()))));
    }

    return (
        <div className="App">
            <MyButton onClick={fetсhPosts}>Получить посты</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <PostFilter sort={sortPosts} filter={searchPost} />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во постов на странице"
                options={[
                    {value: 5, name: "5"},
                    {value: 10, name: "10"},
                    {value: 25, name: "25"},
                    {value: -1, name: "Все"}
                ]}
            />
            {postError &&
                <h1 style={{color: "red", marginTop: "20px", marginBottom: "20px"}}>Произошла ошибка!</h1>
            }
            {Boolean(isPostsLoading) && 
                <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}> <Loader /> </div>
            }
            <PostList remove={removePost} posts={posts} />
            <div ref={lastElement} style={{height: "20px", background: "red"}} />
            <MyButton style={{marginTop: "10px"}} onClick={() => setModal(1)}>
                Создать пост
            </MyButton>
            <Pagination
            pagesArray={pagesArray} page={page} setPage={setPage}
            />
        </div>
    )
}

export default Posts;
