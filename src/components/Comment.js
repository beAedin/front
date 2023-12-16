import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button, Input } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
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
    // console.log(props.data);

    const handleContentsChange = (e) => {
        setCommentInput(e.target.value);
    };

    const onUpdateComment = () => {
        setCommentInput(props.data?.content);
        setEditMode(true);
    };

    const onCompleteUpdateComment = () => {
        if (commentInput.length < 1) {
            window.alert('댓글을 입력하세요');
            return;
        }
        setEditMode(false);
        dispatch(
            updateComment({
                accessToken: cookies.accessToken,
                commentId: props.data?.id,
                content: commentInput,
                boardId: props.data?.boardId,
            })
        ).then((res) => {
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
        <div className="relative bg-stone-100 h-48 flex flex-col p-5 mb-2">
            {props?.currentUserId === props.data?.userId && !editMode && (
                <div className="absolute top-4 right-4">
                    <EditOutlined onClick={onUpdateComment} className="mr-3 text-green-700" />
                    <CloseOutlined className="text-red-600" onClick={onDeleteComment} />
                </div>
            )}
            {editMode && (
                <div className="absolute top-4 right-4">
                    <Button onClick={onCompleteUpdateComment} type="link" className="mr-3">
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
                    <p className="absolute bottom-0 right-0 text-right text-stone-700">
                        {format(new Date(props.data?.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
                    </p>
                </div>
            )}
        </div>
    );
};
export default Comment;
