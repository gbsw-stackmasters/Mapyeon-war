import styles from './Login.module.css'
import Header from "../../components/Header/Header";

function Login() {
  return(
    <div>
      <Header />

      <div className={styles.login_section}>
                <div className={styles.login_box}>
                    <h3>로그인</h3>
                        <div className={styles.form_area}>
                            <form>
                                <input type="text" placeholder="아이디" id={styles.input_box} />
                                <input type="password" placeholder="비밀번호" id={styles.input_box} />
                                <button type="submit" id={styles.sub_btn}>확인</button>
                            </form>
                        </div>
                </div>
            </div>
    </div>
  );
}

export default Login;