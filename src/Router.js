import { HomePage as Home } from './pages/HomePage';
import { BoardPage as Board } from './pages/board/BoardPage';
import { BoardDetailPage as BoardDetail } from './pages/board/BoardDetail';
import { EditPostPage as EditPost } from './pages/board/EditPost';
import { LoginPage as Login } from './pages/LoginPage';
import { SignUpPage as SignUp } from './pages/SignUpPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';

const Router = () => {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/board" element={<Board />}></Route>
                <Route path="/board/edit" element={<EditPost />}></Route>
                <Route path="/board/:boardId" element={<BoardDetail />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
