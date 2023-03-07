import React from 'react'

import { Spinner } from 'flowbite-react'

const VerifyLoading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <Spinner size="lg" color="purple" />
      <span className="font-semibold mt-2 text-center">Verifying...</span>
    </div>
  )
}

export default VerifyLoading
