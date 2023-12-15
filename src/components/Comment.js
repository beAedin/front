import React from 'react';
import { format } from 'date-fns';
const Comment = (props) => {
    console.log(props.data);
    return (
        <div className="bg-slate-300 h-36 flex flex-col p-5 gap-5 mb-2">
            <p className="text-left">{props.data?.userId}</p>
            <p className="text-left">{props.data?.content}</p>
            <p className="text-right">
                {' '}
                {format(new Date(props.data?.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
            </p>
        </div>
    );
};
export default Comment;
