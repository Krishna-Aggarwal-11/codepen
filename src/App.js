
import { Routes,Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import { useEffect, useState } from 'react';
import { auth, db } from './config/firebaseConfig';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import Spinner from './components/Spinner';
import { useDispatch } from 'react-redux';
import { SET_USER } from './context/actions/userActions';
import NewProject from './Pages/NewProject';
import { SET_PROJECT } from './context/actions/projectAction';

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((userCred)=>{
      if (userCred) {
        console.log(userCred?.providerData[0])
        setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0]).then(()=>{
          //dispatch the action to store
          dispatch(SET_USER(userCred?.providerData[0]))
          navigate("/home/projects",{replace:true})
        })
      } else {
        navigate("/home/auth",{replace:true})
      }

      setInterval(() => {
        setLoading(false)
      }, 2000);
    })

    //clean up the listener event
    return ()=> unsubscribe()
  },[])

  useEffect(() => {
    const projectQuery = query(
      collection(db,"Project"),
      orderBy("id","desc")
    ) 

    const unsubscribe = onSnapshot(projectQuery , (querySnaps) =>{
      const projectList = querySnaps.docs.map(doc=>doc.data())
      dispatch(SET_PROJECT(projectList))
    })
    return unsubscribe ;
  }, [])
  
  return (
    <>
    {loading ? (
      <div className=' w-screen h-screen flex items-center justify-center overflow-hidden'><Spinner/></div>
    ) : (
      <div className=" w-full h-full flex items-start justify-start">
      <Routes>
        <Route path='/home/*' element={<Home/>}/>
        <Route path='/newProject' element={<NewProject/>}/>
        
        <Route path='*' element={<Navigate to={"/home"}/>}/>
      </Routes>
    </div>
    )}
    </>
  );
}

export default App;
