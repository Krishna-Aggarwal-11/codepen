import {GithubAuthProvider, GoogleAuthProvider, signInWithRedirect} from "firebase/auth"
import { auth } from "../config/firebaseConfig"
import {v4 as uuidv4} from "uuid"

const googleProvider  = new GoogleAuthProvider()
const gitHubProvider  = new GithubAuthProvider()

export const signINWithGoogle  = async () =>{
    await signInWithRedirect(auth,googleProvider).then(userCred=>{
        window.location.reload();
    })
}
export const signINWithGitHub  = async () =>{
    await signInWithRedirect(auth,gitHubProvider).then(userCred=>{
        window.location.reload();
    })
}
export const signOutAction  = async () =>{
    await auth.signOut().then(()=>{
        window.location.reload();
    })
}


export const Menus = [
    {id:uuidv4(),name:"Projects",url:"/hoome/projects"},
    {id:uuidv4(),name:"Collections",url:"/hoome/collections"},
    {id:uuidv4(),name:"Profile",url:"/hoome/profile"},
]

