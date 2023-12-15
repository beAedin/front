import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button, Input } from 'antd';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
    getAllComments,
    deleteComment,
    updateComment,
    initCommentsData,
} from '../utils/slice/commentSlice';

const { TextArea } = Input;

const Comment = (props) => {
    const [cookies] = useCookies(['accessToken']);
    const dispatch = useDispatch();
    const [commentInput, setCommentInput] = useState();
    const [editMode, setEditMode] = useState();

    const handleContentsChange = (e) => {
        setCommentInput(e.target.value);
    };

    const onUpdateComment = () => {
        setCommentInput(props.data?.content);
        setEditMode(true);
    };

    const onCompleteUpdateComment = () => {
        setEditMode(false);
        dispatch(
            updateComment({
                accessToken: cookies.accessToken,
                commentId: props.data?.id,
                content: commentInput,
                boardId: props.data?.boardId,
            })
        ).then((res) => {
            console.log(res);
            dispatch(initCommentsData());
        });
    };

    const onDeleteComment = () => {
        dispatch(
            deleteComment({
                accessToken: cookies.accessToken,
                id: props.data?.id,
            })
        ).then((res) => {
            dispatch(getAllComments({ accessToken: cookies.accessToken, id: props.data?.boardId }));
        });
    };

    return (
        <div className="relative bg-slate-300 h-40 flex flex-col p-5 mb-2">
            {props?.currentUserId === props.data?.userId && !editMode && (
                <div className="absolute top-4 right-4">
                    <Button onClick={onUpdateComment} className="mr-3">
                        Edit
                    </Button>
                    <Button onClick={onDeleteComment} danger>
                        Delete
                    </Button>
                </div>
            )}
            {editMode && (
                <div className="absolute top-4 right-4">
                    <Button onClick={onCompleteUpdateComment} className="mr-3">
                        Comment
                    </Button>
                </div>
            )}
            <p className="text-left mb-3">{props.data?.userId}</p>
            {editMode ? (
                <div>
                    <TextArea
                        rows={3}
                        maxLength={300}
                        onChange={handleContentsChange}
                        placeholder="Contents"
                        className="h-36 mb-2"
                        value={commentInput}
                    />
                </div>
            ) : (
                <div className="relative h-full">
                    <p className="text-left mt-4">{props.data?.content}</p>
                    <p className="absolute bottom-0 right-0 text-right">
                        {format(new Date(props.data?.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
                    </p>
                </div>
            )}
        </div>
    );
};
export default Comment;
