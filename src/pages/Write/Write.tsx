import React from 'react';
import styles from 'pages/Write/Write.module.css'
import Header from "components/Header/Header";

function Writepage() {
  return (
    <>
      <Header/>
      <div className={styles.Write_container}>
        <div className={styles.title}>
          <span>제목</span>
          <input type="text"/>
          <input type="button" value={"공개"} name="public_private"/>
          <input type="button" value={"비공개"} name="public_private"/>
        </div>
        <div className={styles.detail}></div>
      </div>
    </>
  );
}

export default Writepage;