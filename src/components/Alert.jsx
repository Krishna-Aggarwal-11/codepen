import React from 'react'
import { motion } from 'framer-motion';

const Alert = ({status , alertMsg}) => {
  return (
    <motion.div initial={{ opacity: 0 ,y:50 }}
    animate={{ opacity: 1 ,y:0}}
    exit={{ opacity: 0,y:50 }} className=' fixed top-24 right-12 z-10'>
        {status === "success" && (
            <div className=' px-4 py-2 rounded-md bg-emerald-400 shadow-md shadow-emerald-500'>
                <p className=' text-lg text-primary'>{alertMsg}</p>
            </div>
        )}
        {status === "warning" && (
            <div className=' px-4 py-2 rounded-md bg-yellow-400 shadow-md  shadow-yellow-500'>
                <p className=' text-lg text-primary'>{alertMsg}</p>
            </div>
        )}
        {status === "danger" && (
            <div className=' px-4 py-2 rounded-md bg-red-400 shadow-md'>
                <p className=' text-lg text-primary shadow-red-500'>{alertMsg}</p>
            </div>
        )}
    </motion.div>
  )
}

export default Alert