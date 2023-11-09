import styles from "components/Header/Header.module.css";
import LetterIco from "img/letter-svgrepo-com (1).svg";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className={styles.inner}>
        <div className={styles.head_container}>
          <div onClick={() => navigate("/")} className={styles.header_brand}>
            <div className={styles.head_brand}>마음의 편지</div>
            <img src={LetterIco} />
          </div>
          <div className={styles.login_signup}>
            <div className={styles.login}>
              <div onClick={() => navigate("/Login")}>로그인</div>
            </div>
            <div className={styles.signup}>
              <div onClick={() => navigate("/Signin")}>회원가입</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header