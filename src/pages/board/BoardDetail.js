import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, Space, FloatButton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getPostById, selectBoardData } from '../../utils/slice/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

export const BoardDetailPage = () => {
    const params = useParams();
    console.log(params.boardId);

    const dispatch = useDispatch();
    const post = useSelector(selectBoardData);
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        dispatch(getPostById({ accessToken: cookies.accessToken, id: params.boardId }));
    }, []);

    return (
        <div>
            <h1>안녕</h1>
            <h4>자ㄱ성자</h4>
            <p>본문</p>
        </div>
    );
};
