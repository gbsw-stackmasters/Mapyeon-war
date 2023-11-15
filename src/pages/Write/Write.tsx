import React, { useState } from 'react';
import styles from 'pages/Write/Write.module.css'
import Header from "components/Header/Header";
import axiosInstance from 'utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
function Writepage() {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const onButton = () => {
    setButtonState(true);
  };
  const offButton = () => {
    setButtonState(false);
  };

  const createBoard = () => {
    if(!title) return alert('제목을 써주세요');
    if(!content) return alert('내용을 써주세요');
    axiosInstance('/api/board/create',{
      method: "POST",
      data:{
        title,
        content,
        isShow: buttonState
      }
    }).then((res)=>{
      if(res.data.success){
        alert(res.data.message);
        navigate('/');

      }
    }).catch((err)=>{
      alert(err.response.data.message);
    })
  }
  return (
    <>
      <div className={styles.Write_container}>
        <div className={styles.title}>
          <span>제목</span>
          <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className={styles.write_title} />
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
          <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} className={styles.write_detail}  />
        </div>
        <div className='submit'>
          <input type="submit" value={"보내기"} onClick={createBoard} className={styles.submit}/>
        </div>
      </div>
    </>
  );
}

export default Writepage;

function setIsCheck(arg0: (check: boolean) => boolean) {
  throw new Error('Function not implemented.');
}
