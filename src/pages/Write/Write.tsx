import React, { useState } from 'react';
import styles from 'pages/Write/Write.module.css'
import Header from "components/Header/Header";

function Writepage() {
  const [buttonState, setButtonState] = useState<boolean>(false)
  const onButton = () => {
    setButtonState(true);
  };
  const offButton = () => {
    setButtonState(false);
  };
  return (
    <>
      <Header />
      <div className={styles.Write_container}>
        <div className={styles.title}>
          <span>제목</span>
          <input type="text" className={styles.write_title} />
          <div>
            <button
              style={{
                backgroundColor: buttonState ? "#1F4D2C" : "#fff",
                color: buttonState ? "#fff" : "#1F4D2C",
              }}
              onClick={onButton}
            >
              공개
            </button>
            <button
              style={{
                backgroundColor: !buttonState ? "#1F4D2C" : "#fff",
                color: buttonState ? "#1F4D2C" : "#fff",
              }}
              onClick={offButton}
            >
              비공개
            </button>
          </div>
        </div>
        <div className={styles.detail}>
          <span>내용</span>
          <input type="text" className={styles.write_detail} />
        </div>
      </div>
    </>
  );
}

export default Writepage;

function setIsCheck(arg0: (check: boolean) => boolean) {
  throw new Error('Function not implemented.');
}
