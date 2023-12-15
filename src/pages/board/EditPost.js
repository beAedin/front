import React, { useEffect, useState } from 'react';
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

    const props = {
        name: 'file',
        multiple: true,
        onChange(info) {
            info.file.status = 'done';
            setFiles(info.fileList);
        },
        onRemove(e) {
            setFiles([]);
        },
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentsChange = (e) => {
        setContents(e.target.value);
    };

    const handlePost = (e) => {
        dispatch(createPost({ accessToken: cookies.accessToken, title, description: contents }))
            .then((res) => {
                // 만약 파일 있으면=
                if (files.length > 0) {
                    dispatch(uploadFile({ accessToken: cookies.accessToken, file: files }))
                        .then((res) => {
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
                    // style={{ height: 120, resize: 'none' }}
                />
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading
                        company data or other banned files.
                    </p>
                </Dragger>
            </Flex>
            <FloatButton onClick={handlePost} icon={<EditOutlined />} tooltip={<div>Write</div>} />
        </div>
    );
};
