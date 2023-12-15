import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Nav = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const [isLogin, setIsLogin] = useState();

    // AccessToken을 쿠키에서 가져오는 함수
    const getAccessTokenFromCookie = () => {
        return !!cookies.accessToken;
    };

    // AccessToken 쿠키 삭제
    const removeAccessTokenCookie = () => {
        removeCookie('accessToken', { path: '/' }); // '/' 경로의 accessToken 쿠키 삭제
        setIsLogin(false);
    };

    useEffect(() => {
        // 쿠키에서 값 추출
        const isAuthenticated = getAccessTokenFromCookie();

        // 추출된 값으로 로그인 상태 업데이트
        setIsLogin(isAuthenticated);
    }, [cookies.accessToken]); // 쿠키 값의 변화를 감지하여 useEffect 재실행

    return (
        <header className="">
            <h1 className="py-5 text-5xl font-bold ">Nest Project</h1>
            <nav className="flex justify-around">
                <div className="flex gap-5">
                    <Link className=" py-2" to="/">
                        Home
                    </Link>
                    <Link className=" py-2" to="/board">
                        Board
                    </Link>
                </div>
                <div className="flex gap-5">
                    {isLogin ? (
                        <button className=" py-2" onClick={removeAccessTokenCookie}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link className=" py-2" to="/login">
                                Login
                            </Link>
                            <Link className=" py-2" to="/signup">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Nav;
