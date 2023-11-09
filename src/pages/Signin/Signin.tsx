import styles from '../Signin/Signin.module.css'
import Header from "../../components/Header/Header";
import { ChangeEvent, FormEvent, useState } from 'react';

function Signin () {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> ) => {
      const newValue = event.target.value;
      setInputValue(newValue);

      if (newValue.length > maxLength) {
          alert('인증번호는 6자리입니다');
      }
  };

  const maxLength = 6;

  const handleSubmit = (event: FormEvent) => {
      event.preventDefault();

      if (inputValue.trim() === "") {
        alert("인증번호를 입력하세요");
      }
  }
  
  return (
    <div>
      <Header/>
      <div className={styles.signIn_section}>
                <div className={styles.signIn_box}>
                    <h3>회원가입</h3>
                        <div className={styles.form}>
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="성명" />
                                <input type="text" placeholder="아이디" />
                                <input type="password" placeholder="비밀번호" />
                                <input type="email" placeholder="이메일" />
                                <input type="text"
                                placeholder="인증번호"
                                value={inputValue}
                                onChange={handleInputChange}
                                maxLength={maxLength} />
                                <button type="submit" id={styles.sub_btn}>회원가입</button>
                            </form>
                        </div>
                </div>
            </div>
    </div>
  );
}

export default Signin;