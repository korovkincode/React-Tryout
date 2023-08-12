import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = (props) => {
    return (
        <div>
            <TransitionGroup>
                {props.posts.map((post, index) => 
                    <CSSTransition key={index} timeout={500} classNames="post">
                        <PostItem remove={props.remove} item={{...post, num: index + 1}} key={index} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}

export default PostList;