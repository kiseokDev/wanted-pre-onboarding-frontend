import {useState} from "react";
import {validateForm} from "../features";

export default function useAuthForm() {
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

  return {email, password, isFormValid, handleEmailChange, handlePasswordChange};
}
