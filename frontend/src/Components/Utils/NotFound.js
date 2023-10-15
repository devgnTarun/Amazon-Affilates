import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const NotFound = () => {
  return (
<div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <div className="text-center">
      <i className="mx-auto h-12 w-auto text-yellow-400 text-5xl fas fa-exclamation-triangle" aria-hidden="true"></i>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
        404 Not Found
      </h2>
      <p className="mt-2 text-center text-md text-gray-400 mb-8">
        Sorry, the page you are looking for could not be found.
      </p>
      <Link className='bg-yellow-500 text-white hover:bg-yellow-400 px-7 py-3 rounded-lg' to='/'>Go Back</Link>
    </div>
  </div>
</div>
  )
}

export default NotFound