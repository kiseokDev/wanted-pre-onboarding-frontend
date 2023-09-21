import {useContext, useState} from "react";
import {validateForm} from "../features";
import {AuthAPI} from "../api";
import {AuthContext} from "../components";
import axios from "axios";

export default function useAuth() {
  const api = new AuthAPI();
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
        localStorage.setItem("access_token", response.data.access_token); 
        setToken(response.data.access_token);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert(error.response.data.message);
        }
      }
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.signInApi({email, password});
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        setToken(response.data.access_token); 
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("이메일 혹은 비밀번호 오류");
        } else if (error.response?.status === 404) {
          alert(error.response.data.message); //"해당 사용자가 존재하지 않습니다."
        }
      }
    }
  };

 

  return {email, password, isFormValid, handleEmailChange, handlePasswordChange, handleSignInSubmit, handleSignUpSubmit};
}
