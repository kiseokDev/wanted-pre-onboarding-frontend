import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    if (location.pathname === '/signup' || location.pathname === '/signin') {
        return null; // '/signup' 경로에서는 내비게이션을 렌더링하지 않습니다.
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/signup">회원가입</Link>
                </li>
                <li>
                    <Link to="/signin">로그인</Link>
                </li>
                {/* 다른 링크들을 여기에 추가할 수 있습니다 */}
            </ul>
        </nav>
    );
}

export default Navigation;

