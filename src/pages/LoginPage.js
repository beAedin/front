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
        <div>
            <h1 className="text-4xl">Login</h1>
            <form className="mt-10" onSubmit={handleLogin}>
                <div>
                    <label>아이디:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};
