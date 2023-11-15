import styles from './AdminList.module.css'
import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
import { useParams,useNavigate } from 'react-router-dom';
interface Store {
  uuid: string
  title: string
  content: string
  isShow: boolean,
  createdAt: string;
}
function Admin () {
  const navigate = useNavigate();
  const {id} = useParams();
  const [list, setList] = useState<Store[]>([{
    uuid: "hongjea",
    title: "hongjea",
    content: "hongjea",
    isShow: true,
    createdAt: "2023-11-11T07:18:08.996Z"
  }]);
  const [page, setPage] = useState<number>(1)
  
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
    axiosInstance(`/api/board/get/list?page=${id}`,{
      method: "GET",
    }).then((res)=>{
      if(res.data.success){
        setList(res.data.list);
        setPage(res.data.length);
      }
    })
  },[id])

  const handleOnClickPage = (pageNum:number) => {
    navigate(`/admin/list/${pageNum}`);
  }

  const handleOnClickDelete = (uuid:string) => {
    axiosInstance('/api/board/delete',{
        method: "DELETE",
        data:{
            uuid
        }
    }).then((res)=>{
        if(res.data.success){
            alert(res.data.message);
            window.location.href = '/admin/list'
        }
    }).catch((err)=>{
        alert(err.response.data.message);
    })
  }
  return (
    <div>
      <div>
        <div className={styles.store_container}>
          {list.map((it, index) => { 
            const createdAt = new Date(it.createdAt)
           
            return (
            <>
              <div className={styles.store_box}> 
              <div className={styles.store_title} style={{cursor: 'pointer'}} key={index} onClick={()=>{navigate(`/detail/${it.uuid}`)}}>{it.title}</div>
              <div className={styles.store_create_date}>{createdAt.getFullYear()}-{createdAt.getMonth() + 1}-{createdAt.getDate()}</div>
              <button onClick={()=>{handleOnClickDelete(it.uuid)}} className={styles.deleteBtn}>삭제</button>
              </div>
            </>
           )
           })
          }
        </div>
        <div className={styles.pagenation}>
          {[...Array(page)].map((it, index) => {
            return (
              <button onClick={()=>{handleOnClickPage(index+1)}}>{index+1}</button>
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default Admin;