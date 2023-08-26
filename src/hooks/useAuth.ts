import {useContext, useState} from "react";
import {validateForm} from "../features";
import {AuthAPI} from "../api";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../components";
import {AxiosError} from "axios";
import {useMutation} from "react-query";
import {AuthPayload} from "../types";
import {hasMessage, isErrorMessage} from "../util";

export default function useAuthApiHandlersHook() {
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

  // const handleSignUpSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await api.signUpApi({email, password});
  //     if (response.status === 201) {
  //       navigator("/signin");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       if (error.response?.status === 400) {
  //         // 동일한 메일 존재시 alert
  //         alert(error.response.data.message);
  //       }
  //     }
  //   }
  // };

  // const handleSignInSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await api.signInApi({email, password});
  //     if (response.status === 200) {
  //       localStorage.setItem("access_token", response.data.access_token); // JWT를 로컬 스토리지에 저장
  //       setToken(response.data.access_token); // 토큰 설정
  //       navigator("/todo");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       if (error.response?.status === 401) {
  //         // 비밀번호 오류
  //         alert("이메일 혹은 비밀번호 오류");
  //       } else if (error.response?.status === 404 && error.response.data.message === "해당 사용자가 존재하지 않습니다.") {
  //         // alert("해당 사용자가 존재하지 않습니다.");
  //         alert("이메일 혹은 비밀번호 오류");
  //       }
  //     }
  //   }
  // };

  const signUpMutation = useMutation((payload: AuthPayload) => api.signUpApi(payload), {
    onSuccess: (data) => {
      // Handle success state here...
      if (data.status === 201) {
        navigator("/signin");
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400 && isErrorMessage(error.response.data)) {
        alert(error.response.data.message);
      }
    },
  });

  const signInMutation = useMutation((payload: AuthPayload) => api.signInApi(payload), {
    onSuccess: (data) => {
      // Handle success state here...
      if (data.status === 200) {
        localStorage.setItem("access_token", data.data.access_token);
        setToken(data.data.access_token);
        navigator("/todo");
      }
    },
    onError: (error: AxiosError) => {
      if (
        error.response?.status === 401 ||
        (error.response?.status === 404 && hasMessage(error.response.data) && error.response.data.message === "해당 사용자가 존재하지 않습니다.")
      ) {
        alert("이메일 혹은 비밀번호 오류");
      }
    },
  });

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signUpMutation.mutate({email, password});
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signInMutation.mutate({email, password});
  };

  return {email, password, isFormValid, handleEmailChange, handlePasswordChange, handleSignInSubmit, handleSignUpSubmit};
}
