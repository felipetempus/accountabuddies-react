import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Input, FormGroup } from 'react-bootstrap';

import API from "../../modules/data_module"
import CommentaryBox from "./CommentaryBox"
import NewCommentaryButton from "./NewCommentaryButton"
import DeleteButton from "./DeleteButton"
import EditPostButton from "./EditPostButton"
import EditPostForm from "./EditPostForm"

// moods

const PostDetails = (props) => {
    let groupId = props.groupId
    let postId = props.postId
    let profile = props.profile

    const [ editing, setEditing ] = useState(false)
    const trigger = () => {
        setEditing(!editing)
    }

    const [ commentaries, setCommentaries ] = useState([])
    const [ post, setPost ] = useState({"title":"", "created_by": "", "created_at": "", "description":""})

    const getPost = async () => {
        const query = await API.get("forum_post", postId)
        setPost(query)
    }

    const getCommentaries = async () => {
        const list = await API.getCustom("forum_commentary", `post=${postId}`);
        setCommentaries(list)
    }


    useEffect(()=>{
        getPost()
        getCommentaries()
    },[])

    //TODO: formate the date

    return <>
        <div className="container">
        { 
            editing ? 
            <EditPostForm trigger={trigger} groupId={groupId} getPost={getPost} table={"forum_post"} id={post.id} post={post}/> 
            : <>
            <h1>{post.title}</h1>
            <h5>Posted by: {post.created_by.first_name} in {post.created_at}</h5>
            <h4>{post.content}</h4>
            { post.created_by.id == profile.id ? <> <DeleteButton groupId={groupId} getPost={getPost} table={"forum_post"} id={post.id} />  <EditPostButton trigger={trigger}  /> </>: null }
        </>
        }
        </div>
        <div>
            { commentaries.map(commentary => <CommentaryBox id={post.id} groupId={groupId} commentary={commentary} key={commentary.id} profile={profile} getCommentaries={getCommentaries}/>) }
        </div>
        <NewCommentaryButton postId={postId} groupId={groupId} getCommentaries={getCommentaries} />
    </>
};

export default PostDetails;