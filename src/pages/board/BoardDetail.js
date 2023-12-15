import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getPostById, selectOneBoardData } from '../../utils/slice/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';
import Comment from '../../components/Comment';
import { createComment } from '../../utils/slice/commentSlice';

const { TextArea } = Input;
export const BoardDetailPage = () => {
    const params = useParams();
    const [commentInput, setCommentInput] = useState();

    const dispatch = useDispatch();
    const post = useSelector(selectOneBoardData);
    const [cookies] = useCookies(['accessToken']);

    const handleContentsChange = (e) => {
        setCommentInput(e.target.value);
    };

    const onSubmitComment = () => {
        dispatch(
            createComment({
                accessToken: cookies.accessToken,
                content: commentInput,
                userId: post.user.id,
                boardId: post.id,
            })
        ).then((res) => {
            setCommentInput('');
        });
    };

    useEffect(() => {
        dispatch(getPostById({ accessToken: cookies.accessToken, id: params.boardId }));
    }, []);

    useEffect(() => {
        console.log(post);
        console.log(post.user);
    }, [post]);

    return (
        <div className=" h-5/6 px-10">
            <div className="bg-slate-100 h-4/6 mt-10 p-10">
                <h1 className="text-4xl">{post?.title}</h1>
                <p className="text-right">{post?.user?.email}</p>
                {post.updatedAt && (
                    <p className="text-right">
                        {format(new Date(post.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
                    </p>
                )}
                <p className="mt-12 text-xl text-stone-800">{post?.description}</p>
            </div>

            <h1 className="text-left text-3xl mt-10 mb-6 mx-4">Comment</h1>
            <TextArea
                rows={4}
                maxLength={300}
                onChange={handleContentsChange}
                placeholder="Contents"
                className="h-36 mb-2"
                value={commentInput}
            />
            <div className="flex justify-end">
                <Button onClick={onSubmitComment} className="mb-8" type="link">
                    Comment
                </Button>
            </div>

            <Comment></Comment>
        </div>
    );
};
