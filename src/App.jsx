import './App.css'

function App() {

  return (
    <>
      <section className='max-w-4xl mx-auto py-8 flex flex-col items-center gap-8'>
        <h1 className='text-2xl text-center'>Shape Drawer</h1>
        <div className='flex items-center gap-4'>
          <button className='p-1 px-4 bg-blue-500 text-white rounded-sm'>Clear</button>
          <button className='p-1 px-4 bg-gray-300 text-white rounded-sm'>Undo</button>
          <button className='p-1 px-4 bg-gray-300 text-white rounded-sm'>Redo</button>
          <select name="" id="" className='outline-1 p-1 px-4 rounded-sm'>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
          <input type="color" value="#0000FF" />
          <input type="range" />
        </div>
        <div className='outline-dashed outline-2 outline-blue-500 w-full h-80 rounded-md flex items-center justify-center'>
          <p className='text-xl text-center text-gray-600'>Click anywhere in this area to add a circle. <br/> Use Ctrl+Z to undo and Ctrl+Y to redo.</p>
        </div>
      </section>
    </>
  )
}

export default App
