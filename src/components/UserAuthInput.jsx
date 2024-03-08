import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const UserAuthInput = ({
  label,
  placeholder,
  isPass,
  setStateFunction,
  Icon,
  setGetEmailValidationStatus
}) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleTextChange = (e) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);

    if (placeholder === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
      setGetEmailValidationStatus(status)
    }
  };
  return (
    <div className=" flex items-start justify-start gap-1 flex-col">
      <label className=" text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
          !isEmailValid &&
          placeholder === "Email" &&
          value.length > 0 &&  "border-2 border-red-500"
        }`}
      >
        <Icon className=" text-text555 text-xl" />
        <input
          type={isPass && showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
          value={value}
          onChange={handleTextChange}
        />

        {isPass && (
          <motion.div
            onClick={() => setShowPassword(!showPassword)}
            whileTap={{ scale: 0.9 }}
            className=" cursor-pointer"
          >
            {showPassword ? (
              <FaEyeSlash className=" text-text555 text-xl" />
              ) : (
              <FaEye className=" text-text555 text-xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;
