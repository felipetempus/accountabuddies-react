import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, FormGroup } from 'react-bootstrap';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import API from "../../modules/data_module"
import { formatDate } from "../Helpers"

// moods

const ForumPreviewBox = (props) => {
    let { post, groupId, history } = props

    let user = post.created_by

    const goForum = () => {
        history.push(`/forum/${groupId}/${post.id}`)
    }
    console.log(post)

    return <>
        <Card>
            <CardContent>
                <Typography variant={"h5"} color="textSecondary" gutterBottom>
                    <Link onClick={goForum}> {post.title} </Link>
                </Typography>
                <Typography variant={'subtitle2'} color="textSecondary" gutterBottom>
                    {user.first_name} in {formatDate(post.created_at)}
                </Typography>
                <Typography variant={'subtitle1'} color="textSecondary" gutterBottom>
                    {post.content}
                </Typography>
            </CardContent>
        </Card>
    </>
};

export default withRouter(ForumPreviewBox);