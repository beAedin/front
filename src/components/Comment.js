import React from 'react';
import { format } from 'date-fns';
import { Button } from 'antd';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { getAllComments, deleteComment } from '../utils/slice/commentSlice';

const Comment = (props) => {
    const [cookies] = useCookies(['accessToken']);
    const dispatch = useDispatch();
    console.log(props.data);
    // console.log(props.currentUserEmail);

    const onUpdateComment = () => {};

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
        <div className="relative bg-slate-300 h-36 flex flex-col p-5 gap-5 mb-2">
            {props?.currentUserId === props.data?.userId && (
                <div className="absolute top-4 right-4">
                    <Button onClick={onUpdateComment} className="mr-3">
                        Edit
                    </Button>
                    <Button onClick={onDeleteComment} danger>
                        Delete
                    </Button>
                </div>
            )}
            <p className="text-left">{props.data?.userId}</p>
            <p className="text-left">{props.data?.content}</p>
            <p className="text-right">
                {format(new Date(props.data?.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
            </p>
        </div>
    );
};
export default Comment;
