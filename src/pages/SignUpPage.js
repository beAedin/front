import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../utils/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { selectStatus, initStatus } from '../utils/slice/authSlice';

export const SignUpPage = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus) || ''; // null 대신 빈 문자열 할당
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        dispatch(initStatus());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기서 회원가입 로직을 구현하거나 서버로 데이터를 전송할 수 있습니다.
        console.log(formData); // 예시로 콘솔에 출력
        if (formData.password.length < 4) {
            window.alert('비밀번호가 너무 짧습니다');
            return;
        }
        dispatch(signUp(formData)).then(() => {});
    };

    useEffect(() => {
        if (status === 'ERROR') {
            window.alert('회원가입 에러 발생');
            dispatch(initStatus());
            return;
        } else if (status === 'SUCCESS') {
            dispatch(initStatus());
            navigate('/login');
        }
    }, [status]);

    return (
        <div className="w-full max-w-sm mx-auto">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-20"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl mb-6">회원가입 페이지</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        e-mail
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        password
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="flex items-center justify-center ">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        가입하기
                    </button>
                </div>
            </form>
        </div>
    );
};
