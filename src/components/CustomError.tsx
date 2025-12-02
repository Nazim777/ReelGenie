import React from 'react'

type customErrorProps = {
    error:string
}

const CustomError = ({error}:customErrorProps) => {
  return (
     <div className="p-6 min-h-screen flex justify-center items-center text-center">
    <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-2">
        ⚠ Something went wrong
      </h2>
      <p>{error}</p>
    </div>
  </div>
  )
}

export default CustomError