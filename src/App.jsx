import React from 'react'
import Todo from './component/Todo'

const App = () => {
  return (
    <div className='bg-stone-900  min-h-screen grid py-4'>
      {/* <h2 className='bg-red-600 p-5 text-center text-4xl font-bold underline font-mono'>App</h2> */}
      <Todo/>
      </div>
  )
}

export default App  