import {useContext, useState} from "react";
import {validateForm} from "../features";
import {AuthAPI} from "../api";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../components";

export default function useAuthForm() {
  const api = new AuthAPI();
  const navigator = useNavigate();
  const {setToken} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsFormValid(validateForm(newEmail, password));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsFormValid(validateForm(email, newPassword));
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.signUpApi({email, password});
      if (response.status === 201) {
        navigator("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.signInApi({email, password});
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token); // JWT를 로컬 스토리지에 저장
        setToken(response.data.access_token); // 토큰 설정
        navigator("/todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {email, password, isFormValid, handleEmailChange, handlePasswordChange, handleSignInSubmit, handleSignUpSubmit};
}
