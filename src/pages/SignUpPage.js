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
        <div className="w-full max-w-md mx-auto h-full">
            <form
                className="relative bg-white shadow-zinc-300 shadow-md rounded px-12 pt-6 pb-8 mb-4 mt-20 h-3/5"
                onSubmit={handleSubmit}
            >
                <h2 className="text-4xl font-semibold mb-14">Sign Up</h2>
                <div className="mb-4">
                    <label
                        className="text-left block text-gray-900 text-sm font-bold mb-10"
                        htmlFor="email"
                    >
                        e-mail
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
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
                        className="text-left block text-gray-900 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        password
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline absolute bottom-7 "
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};
