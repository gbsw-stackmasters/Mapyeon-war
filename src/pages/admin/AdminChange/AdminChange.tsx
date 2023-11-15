import styles from './AdminChange.module.css'
import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
type Str = 'stu' | 'teach' | 'admin'

interface Store {
  uuid: string
  id: string
  email: string
  name: string,
  type: Str;
}
function AdminChange () {
    
  const [list, setList] = useState<Store[]>([{
    uuid: "hongjea",
    id: "hongjea",
    email: "hongjea",
    name: 'asd',
    type: 'stu'
  }]);
  
  useEffect(()=>{
    axiosInstance('/api/auth/isLogin',{
        method:"GET"
    }).then((res)=>{
        if(res.data.success){
            console.log(res.data.users)
            if(res.data.users.type !== 'admin'){
                alert('잘못된 접근입니다')
                window.location.href = '/';
            }
        }
    }).catch((err)=>{
      window.location.href = '/login';
    })
    axiosInstance('/api/auth/list',{
      method: "GET",
    }).then((res)=>{
      if(res.data.success){
        setList(res.data.users);
      }
    }).catch((err)=>{
      window.location.href = '/';

    })
  },[])

  const handleOnClickStu = (uuid:string) => {
    axiosInstance('/api/auth/change/type',{
        method: "PUT",
        data:{
            uuid,
            type: 'stu'
        }
    }).then((res)=>{
        if(res.data.success){
            alert(res.data.message);
            window.location.href = '/admin/change'
        }
    }).catch((err)=>{
        alert(err.response.data.message);
    })
  }

  const handleOnClickTeach = (uuid:string) => {
    axiosInstance('/api/auth/change/type',{
        method: "PUT",
        data:{
            uuid,
            type: 'teach'
        }
    }).then((res)=>{
        if(res.data.success){
            alert(res.data.message);
            window.location.href = '/admin/change'
        }
    }).catch((err)=>{
        alert(err.response.data.message);
    })
  }

  const types = [
    '학생',
    '선생님',
    '관리자'
  ]
  return (
    <div>
      <div>
        <div className={styles.store_container}>
          {list.map((it, index) => { 
            let type;
            if(it.type === 'stu'){
              type = 1
            }else if(it.type === 'teach'){
              type = 2
            }else{
              return;
            }
            
            return (
            <>
              <div className={styles.store_box}> 
              <div className={styles.store_title} key={index}>이름: {it.name}</div>
              <div className={styles.store_create_date}>닉네임: {it.id} | 등급: {types[type - 1]} </div>
              <div  className={styles.deleteBtn}>
                <button onClick={()=>{handleOnClickStu(it.uuid)}}>학생으로 변경</button>
                <button onClick={()=>{handleOnClickTeach(it.uuid)}}>선생님으로 변경</button>
              </div>
              </div>
            </>
           )
           })
          }
        </div>
      </div>
    </div>
  );
}

export default AdminChange;