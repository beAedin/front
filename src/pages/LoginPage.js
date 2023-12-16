import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initAccessToken, signIn } from '../utils/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { selectStatus, selectAccessToken, initStatus } from '../utils/slice/authSlice';
import { useCookies } from 'react-cookie';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus) || ''; // null 대신 빈 문자열 할당
    const accessToken = useSelector(selectAccessToken) || '';
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // AccessToken을 쿠키에 저장하는 함수
    const setAccessTokenCookie = (accessToken) => {
        if (accessToken.length >= 10) {
            setCookie('accessToken', accessToken, { path: '/' });
            dispatch(initAccessToken());
        }
    };

    useEffect(() => {
        dispatch(initStatus());
    }, []);

    useEffect(() => {
        if (status === 'ERROR') {
            window.alert('로그인 에러 발생');
            dispatch(initStatus());
        } else if (status === 'SUCCESS') {
        }
    }, [status]);

    useEffect(() => {
        if (accessToken.length >= 10) {
            setAccessTokenCookie(accessToken);
            dispatch(initStatus());
            navigate('/');
        }
    }, [accessToken]);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        if (password.length < 4) {
            window.alert('비밀번호가 너무 짧습니다');
            return;
        }

        dispatch(signIn({ email, password })).then(() => {});
    };

    return (
        <div className="w-full max-w-md mx-auto h-full">
            <form
                className=" bg-white shadow-zinc-300 shadow-md rounded px-12 pt-6 pb-8 mb-4 mt-20 h-3/5 w-full relative"
                onSubmit={handleLogin}
            >
                <h1 className="text-4xl mb-14 font-bold">Login</h1>
                <div className="mb-4">
                    <label
                        className="text-left block text-gray-900 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        e-mail
                    </label>
                    <input
                        className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="아이디를 입력하세요."
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="text-left block text-gray-900 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요."
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-stone-600 hover:bg-stone-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline absolute bottom-7 "
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};
