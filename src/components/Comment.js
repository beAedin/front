import React from 'react';
const Comment = () => {
    return (
        <div className="bg-slate-300 h-36 flex flex-col p-5 gap-5 mb-2">
            <p className="text-left">작성자</p>
            <p className="text-left">본문</p>
            <p className="text-right">시간</p>
        </div>
    );
};
export default Comment;
