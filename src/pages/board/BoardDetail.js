import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { getPostById, selectOneBoardData, deletePost } from '../../utils/slice/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';
import Comment from '../../components/Comment';
import { createComment, getAllComments, initCommentsData } from '../../utils/slice/commentSlice';
import { selectCommentsData } from '../../utils/slice/commentSlice';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
export const BoardDetailPage = () => {
    const params = useParams();
    const navigate = useNavigate();
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
        dispatch(
            getAllComments({
                accessToken: cookies.accessToken,
                boardId: post.id,
            })
        );
    };

    const onUpdateBoard = () => {
        navigate('/board/edit', { state: { postId: post?.id } });
    };

    const onDeleteBoard = () => {
        dispatch(
            deletePost({
                accessToken: cookies.accessToken,
                id: post.id,
            })
        )
            .then((res) => {
                navigate('/board');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        dispatch(getAllComments({ accessToken: cookies.accessToken, id: params.boardId }));
        dispatch(getPostById({ accessToken: cookies.accessToken, id: params.boardId }));
    }, []);

    useEffect(() => {
        if (comments.length > 0) {
            const sortedData = [...comments].sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setDisplayComments(sortedData);
        }
    }, [comments]);

    return (
        <div className="h-full px-10">
            <div className="relative bg-stone-100 h-full md:h-5/6 lg:h-4/6 mt-10 p-10">
                <h1 className="text-4xl font-semibold">{post?.title}</h1>
                <p className="text-right text-stone-700">{post?.user?.email}</p>
                {post.updatedAt && (
                    <p className="text-right text-stone-700">
                        {format(new Date(post.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
                    </p>
                )}
                <p className="mt-12 text-sm sm:text-base text-stone-800 break-words">
                    {post?.description}
                </p>
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

            <h1 className="text-left text-2xl mt-10 mb-6 mx-4 text-stone-600">
                <span className="text-3xl font-semibold text-black">Comment</span> (
                {displayComments.length})
            </h1>
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
