import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createPost,
    uploadFile,
    updatePost,
    selectOneBoardData,
    selectCreatedBoardId,
} from '../../utils/slice/boardSlice';
import { Flex, Input } from 'antd';
import { FloatButton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { getPostById } from '../../utils/slice/boardSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const { TextArea } = Input;

export const EditPostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const [cookies] = useCookies(['accessToken']);

    const editData = useSelector(selectOneBoardData);
    const createdBoardId = useSelector(selectCreatedBoardId);

    const { state } = location;
    const postId = state ? state.postId : null;

    useEffect(() => {
        if (postId !== null && typeof postId === 'number') {
            dispatch(getPostById({ accessToken: cookies.accessToken, id: postId })).then((res) => {
                setTitle(editData?.title);
                setContents(editData?.description);
            });
        }
    }, [postId]);

    const inputRef = useRef(null);

    const saveFileImage = (e) => {
        try {
            let files = inputRef.current.files;
            let formData = new FormData();
            let names = [];
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                    names.push(files[i].name); // Collect file names
                }
                setFileNames(names); // Update fileNames state with file names
                return formData;
            } else {
                // No files selected
                return undefined;
            }
        } catch (error) {
            // 이미지 업로드 실패
            return undefined;
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentsChange = (e) => {
        setContents(e.target.value);
    };

    const handlePost = async (e) => {
        e.preventDefault();
        if (title.length < 1) {
            window.alert('제목을 입력하세요');
            return;
        }

        if (contents.length < 1) {
            window.alert('본문을 입력하세요');
            return;
        }

        // EDIT
        if (postId !== null && typeof postId === 'number') {
            dispatch(
                updatePost({
                    accessToken: cookies.accessToken,
                    title,
                    description: contents,
                    id: postId,
                })
            )
                .then((res) => {
                    const formData = saveFileImage(inputRef.current);
                    if (formData) {
                        let dataSet = {
                            accessToken: cookies.accessToken,
                            id: postId,
                        };

                        formData.append('data', JSON.stringify(dataSet)); // JSON 형식으로 파싱 후 추가

                        dispatch(uploadFile({ formData }))
                            .then((res) => {
                                // console.log('성공', res);
                                navigate('/board');
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    } else {
                        navigate('/board');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // CREATE
            // dispatch(createPost({ accessToken: cookies.accessToken, title, description: contents })).unwrap()
            dispatch(createPost({ accessToken: cookies.accessToken, title, description: contents }))
                .unwrap()
                .then(async (res) => {
                    console.log(res.data.id);
                    const formData = saveFileImage(inputRef.current);

                    if (formData) {
                        let dataSet = {
                            accessToken: cookies.accessToken,
                            id: res.data.id,
                        };
                        console.log('흑흑흑');
                        formData.append('data', JSON.stringify(dataSet)); // JSON 형식으로 파싱 후 추가

                        dispatch(uploadFile({ formData }))
                            .then((res) => {
                                //console.log('성공', res);
                                navigate('/board');
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    } else {
                        //console.log('업로드할게없음');
                        navigate('/board');
                    }
                    //}
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <Flex className="mx-16" vertical gap={32}>
                <h1 className="text-4xl">Write</h1>
                <Input
                    placeholder="Title"
                    showCount
                    maxLength={30}
                    onChange={handleTitleChange}
                    value={title}
                />
                <TextArea
                    showCount
                    maxLength={1000}
                    onChange={handleContentsChange}
                    placeholder="Contents"
                    className="h-72"
                    value={contents}
                />
                <div className="flex">
                    <button className="text-lg" onClick={() => inputRef.current.click()}>
                        Upload
                        <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            multiple
                            ref={inputRef}
                            onChange={saveFileImage}
                            style={{ display: 'none' }}
                        />
                    </button>
                </div>
                {fileNames &&
                    fileNames.map((el, i) => (
                        <p className="text-left" key={i}>
                            {el}
                        </p>
                    ))}
            </Flex>
            <FloatButton onClick={handlePost} icon={<EditOutlined />} tooltip={<div>Write</div>} />
        </div>
    );
};
