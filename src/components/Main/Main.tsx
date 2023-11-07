import React from 'react';
import styles from './Main.module.css'
import { Link } from 'react-router-dom';
import LetterIco from '/Work/HeartOfLEtter/src/img/letter-svgrepo-com (1).svg'
import BoxIco from '/Work/HeartOfLEtter/src/img/box-svgrepo-com.svg'

function Main() {
  return (
    <>
      <header>
        <div className={styles.inner}>
          <div className={styles.head_container}>
            <div className={styles.head_brand}>마음의 편지</div>
            <img src={LetterIco} />
            <div className={styles.login_signup}>
              <div className={styles.login}>
                <a href="">로그인</a>
              </div>
              <div className={styles.signup}>
                <a href="">회원가입</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.section}>
        <section>
        <Link to={'/Write'}>
          <div className={styles.letter_container}>
            <div className={styles.letter}>
              <img src={LetterIco} />
              <div className={styles.letter_name}>
                마음의
                <br />
                편지쓰기
              </div>
            </div>
          </div>
          </Link>
        </section>
        <section>
          <div className={styles.store_container}>
            <div className={styles.store}>
              <img src={BoxIco} />
              <div className={styles.store_name}>
                마음 <br />
                보관함
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Main;