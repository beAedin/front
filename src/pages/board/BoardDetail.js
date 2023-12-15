import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getPostById, selectOneBoardData, deletePost } from '../../utils/slice/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';
import Comment from '../../components/Comment';
import { createComment, getAllComments } from '../../utils/slice/commentSlice';
import { selectCommentsData } from '../../utils/slice/commentSlice';

const { TextArea } = Input;
export const BoardDetailPage = () => {
    const params = useParams();
    const [commentInput, setCommentInput] = useState();

    const dispatch = useDispatch();
    const post = useSelector(selectOneBoardData);
    const comments = useSelector(selectCommentsData);
    const [displayComments, setDisplayComments] = useState();
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

    const onUpdateBoard = () => {};

    const onDeleteBoard = () => {
        dispatch(
            deletePost({
                accessToken: cookies.accessToken,
                id: post.id,
            })
        );
    };

    useEffect(() => {
        dispatch(getPostById({ accessToken: cookies.accessToken, id: params.boardId }));
        dispatch(getAllComments({ accessToken: cookies.accessToken, id: params.boardId }));
    }, []);

    useEffect(() => {
        console.log(post.currentUserEmail);
        // console.log(post.currentUserId);
        console.log(post);
    }, [post]);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    useEffect(() => {
        if (comments.length > 0) {
            const sortedData = [...comments].sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
            setDisplayComments(sortedData);
        }
    }, [comments]);

    return (
        <div className=" h-5/6 px-10">
            <div className="relative bg-slate-100 h-4/6 mt-10 p-10">
                <h1 className="text-4xl">{post?.title}</h1>
                <p className="text-right">{post?.user?.email}</p>
                {post.updatedAt && (
                    <p className="text-right">
                        {format(new Date(post.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
                    </p>
                )}
                <p className="mt-12 text-xl text-stone-800">{post?.description}</p>
                {post?.currentUserEmail === post.user?.email && (
                    <div className="absolute bottom-5 right-5 ">
                        <Button onClick={onUpdateBoard} className="mr-3">
                            Edit
                        </Button>
                        <Button onClick={onDeleteBoard} danger>
                            Delete
                        </Button>
                    </div>
                )}
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

            {displayComments &&
                displayComments.map((el, i) => (
                    <Comment key={i} data={el} currentUserId={post?.currentUserId}></Comment>
                ))}
        </div>
    );
};
