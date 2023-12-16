import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, Space, FloatButton } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getAllPost, selectBoardData } from '../../utils/slice/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';
import { initCommentsData } from '../../utils/slice/commentSlice';

export const BoardPage = () => {
    const dispatch = useDispatch();
    const post = useSelector(selectBoardData);
    const [displayPost, setDisplayPost] = useState();
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        dispatch(getAllPost(cookies.accessToken)).then((res) => {});
        dispatch(initCommentsData());
    }, []);

    useEffect(() => {
        if (post.length > 0) {
            const sortedData = [...post].sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });
            setDisplayPost(sortedData);
        }
    }, [post]);

    return (
        <div>
            <div className=" w-full h-20 mt-3 flex px-16 items-center">
                <h1 className="text-3xl font-semibold">Board</h1>
            </div>
            <div className="">
                <ul>
                    <List
                        className=""
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={displayPost}
                        renderItem={(item) => (
                            <List.Item
                                className="bg-slate-50 hover:bg-slate-100"
                                key={item.id}
                                actions={[]}
                            >
                                <List.Item.Meta
                                    // avatar={<Avatar src={item.avatar} />}
                                    title={
                                        <Link to={`/board/${item.id}`}>
                                            <h1 className="mt-3 font-bold">{item.title}</h1>
                                        </Link>
                                    }
                                    description={
                                        <div className="text-right">
                                            <div className="flex justify-end text-stone-800">
                                                {item.userEmail}
                                            </div>
                                            {format(
                                                new Date(item.updatedAt),
                                                'yyyy-MM-dd HH:mm:ss'
                                            )}
                                        </div>
                                    }
                                />

                                {
                                    <p className="mb-16 overflow-hidden whitespace-nowrap overflow-ellipsis">
                                        {item.description}
                                    </p>
                                }
                            </List.Item>
                        )}
                    />
                    {/* <li key={post.id} onClick={() => handlePostClick(post.id)}>
                        {post.title}
                    </li> */}
                </ul>
            </div>
            <FloatButton
                icon={<EditOutlined></EditOutlined>}
                href="/board/edit"
                tooltip={<div>Write</div>}
            />
        </div>
    );
};

// export default HomePage;
