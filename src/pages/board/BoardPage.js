import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paging from '../../components/Paging';
import { List, Space, FloatButton } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export const BoardPage = () => {
    const [data, setData] = useState([
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            id: 1,
            href: 'https://ant.design',
            title: `ant design part`,
            author: 'Kim',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        // 원하는 만큼 게시물 추가 가능
    ]);

    return (
        <div>
            <div className="">
                <ul>
                    {/* {posts.map((post, i) => ( */}
                    {/* <Link key={i} to={`board/${post.id}`}>
                        {post.title}
                    </Link> */}
                    <List
                        className="mt-10"
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 4,
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                className="bg-slate-50"
                                key={item.title}
                                actions={
                                    [
                                        // <IconText
                                        //     icon={StarOutlined}
                                        //     text="156"
                                        //     key="list-vertical-star-o"
                                        // />,
                                        // <IconText
                                        //     icon={LikeOutlined}
                                        //     text="156"
                                        //     key="list-vertical-like-o"
                                        // />,
                                        // <IconText
                                        //     icon={MessageOutlined}
                                        //     text="2"
                                        //     key="list-vertical-message"
                                        // />,
                                    ]
                                }
                                // extra={
                                //     <img
                                //         width={272}
                                //         alt="logo"
                                //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                //     />
                                // }
                            >
                                <List.Item.Meta
                                    // avatar={<Avatar src={item.avatar} />}
                                    title={<Link to={item.href}>{item.title}</Link>}
                                    description={
                                        <div className="flex justify-end">{item.author}</div>
                                    }
                                />
                                {item.content}
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
