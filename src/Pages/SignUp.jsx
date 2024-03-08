import React, { useState } from "react";
import Logo from "../assets/logo.png";
import UserAuthInput from "../components/UserAuthInput";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { signINWithGitHub, signINWithGoogle } from "../utils/helper";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMssg, setAlertMssg] = useState("");

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
          }
        })
        .catch((err) => {
          console.log(err.message)
          if (err.message.includes("user-not-found")) {
            setAlert(true)
            setAlertMssg("Invaild Id : user not found")
          } else if(err.message.includes("wrong-password")){
            setAlert(true)
            setAlertMssg("Password Mismatch")
          }else{
            setAlert(true)
            setAlertMssg("Temporarity disabled due to many failed login")
          }

          setInterval(() => {
            setAlert(false)
          }, 4000);
        });
    }
  };

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        className="object-contain w-32 opacity-50 h-auto"
        alt=""
      />

      <div className=" w-full flex flex-col items-center justify-center py-6">
        <p className="py-8 text-lg text-primaryText">Join with Us!🤩</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-5">
          <UserAuthInput
            label="Email"
            placeholder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          <UserAuthInput
            label="Password"
            placeholder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />

          <AnimatePresence>
            {alert && (
              <motion.p
                key={"AfterMessage"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className=" text-red-500"
              >
                {alertMssg}
              </motion.p>
            )}
          </AnimatePresence>

          {!isLogin ? (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className=" flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-lg text-white">Sign Up</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.9 }}
              className=" flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-lg text-white">Login</p>
            </motion.div>
          )}

          {!isLogin ? (
            <p className=" text-primaryText flex items-center justify-center gap-3">
              Already Have an account !{" "}
              <span
                className=" text-emerald-500 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className=" text-primaryText flex items-center justify-center gap-3">
              Doesn't Have an account !{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className=" text-emerald-500 cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          <div className=" flex items-center justify-center gap-12">
            <div className=" h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
            <p className=" text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
          </div>

          <motion.div
            onClick={signINWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer "
          >
            <FcGoogle className=" text-3xl" />
            <p className=" text-xl text-white">Sign in with Google</p>
          </motion.div>

          <div className=" flex items-center justify-center gap-12">
            <div className=" h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
            <p className=" text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] rounded-md w-24 bg-[rgba(256,256,256,0.2)]"></div>
          </div>

          <motion.div
            onClick={signINWithGitHub}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer "
          >
            <FaGithub className=" text-3xl text-white" />
            <p className=" text-xl text-white">Sign in with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
