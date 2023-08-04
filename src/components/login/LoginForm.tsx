import { Link } from 'react-router-dom';
import useAuthForm from '../../hooks/useAuthForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const navigator = useNavigate();

    const { email, password, isFormValid, handleEmailChange, handlePasswordChange } = useAuthForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/auth/signin`, {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                localStorage.setItem('jwt', response.data.access_token); // JWT를 로컬 스토리지에 저장
                navigator('/todo');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">로그인 정보를 입력해주세요</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">이메일</label>
                    <div className="mt-2">
                        <input onChange={handleEmailChange} value={email} data-testid="email-input" placeholder="이메일" id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                        <div className="text-sm">
                            {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
                        </div>
                    </div>
                    <div className="mt-2">
                        <input onChange={handlePasswordChange} value={password} data-testid="password-input" placeholder="비밀번호" id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button
                        disabled={!isFormValid}
                        data-testid="signin-button"
                        className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm 
                         ${isFormValid ? "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "bg-gray-400 cursor-not-allowed"}`}
                    >로그인</button>

                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account? <br />
                <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">회원가입</Link>
            </p>
        </div>
    </div>
}

export default LoginForm