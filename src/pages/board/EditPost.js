import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, uploadFile } from '../../utils/slice/boardSlice';
import { message, Flex, Input, Upload } from 'antd';
import { FloatButton } from 'antd';
import { InboxOutlined, EditOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Dragger } = Upload;

export const EditPostPage = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [files, setFiles] = useState([]);
    const [cookies] = useCookies(['accessToken']);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const saveFileImage = (e) => {
        try {
            let files = inputRef.current.files;
            console.log(files);
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                console.log(files[i]);
                formData.append('files', files[i]);
            }
            // console.log(formData.getAll('files'));
            return formData;
        } catch (error) {
            // 이미지 업로드 실패
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
        dispatch(createPost({ accessToken: cookies.accessToken, title, description: contents }))
            .then(async (res) => {
                // 만약 파일 있으면=

                const formData = saveFileImage(inputRef.current);
                console.log(formData.getAll('files'));
                if (formData) {
                    let dataSet = {
                        accessToken: cookies.accessToken,
                    };

                    formData.append('data', JSON.stringify(dataSet)); // JSON 형식으로 파싱 후 추가

                    dispatch(uploadFile({ formData }))
                        .then((res) => {
                            console.log('성공', res);
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
    };

    return (
        <div>
            <Flex className="mx-16" vertical gap={32}>
                <h1 className="text-4xl">Write</h1>
                <Input placeholder="Title" showCount maxLength={30} onChange={handleTitleChange} />
                <TextArea
                    showCount
                    maxLength={1000}
                    onChange={handleContentsChange}
                    placeholder="Contents"
                    className="h-72"
                />
                <button onClick={() => inputRef.current.click()}>
                    업로드
                    <input
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        multiple
                        ref={inputRef}
                        onChange={saveFileImage}
                        style={{ display: 'none' }}
                    />
                </button>
            </Flex>
            <FloatButton onClick={handlePost} icon={<EditOutlined />} tooltip={<div>Write</div>} />
        </div>
    );
};
