import { useState } from 'react';
import './App.css'

function App() {

  const [allCoordinates, setAllCoordinates] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [showDraw, setShowDraw] = useState(false);
  const [redoStack, setRedoStack] = useState([]);

  const handleElementPosition = (event) => {

    setShowMessage(false);
    setShowDraw(true);
    setRedoStack([]);

    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();

    const newTop = event.clientY - rect.y;
    const newLeft = event.clientX - rect.x;

    setAllCoordinates((prev) => [...prev, { top: newTop, left: newLeft, id: crypto.randomUUID() }]);
  }

  //For Clear Drawer 
  const handleClearDraw = () => {
    setAllCoordinates([]);
    setRedoStack([]);
    setShowMessage(true);
  }

  //For Undo Drawer 

  const handleUndoDraw = () => {
    setAllCoordinates((prev) => {
      return prev.slice(0, -1);
    });
    const lastElement = allCoordinates[allCoordinates.length - 1];
    setRedoStack((prev) => [...prev, lastElement]);
  }

  //For Redo Drawer
  const handleRedoDraw = () => {
    const lastElementInRedoStack = redoStack[redoStack.length - 1];
    setAllCoordinates((prev) => [...prev, lastElementInRedoStack]);
    setRedoStack((prev) => {
      return prev.slice(0, -1)
    });
  }

  return (
    <>
      <section className='max-w-4xl mx-auto py-8 flex flex-col items-center gap-8'>
        <h1 className='text-2xl text-center'>Shape Drawer</h1>

        <div className='flex items-center gap-4'>
          <button className='p-1 px-4 bg-blue-500 text-white rounded-sm' onClick={handleClearDraw}>Clear</button>
          <button className={`p-1 px-4 ${allCoordinates.length === 0 ? "bg-gray-300 cursor-no-drop" : "bg-blue-500 cursor-pointer"}  text-white rounded-sm`} onClick={handleUndoDraw}>Undo</button>
          <button className={`p-1 px-4 ${redoStack.length === 0 ? "bg-gray-300 cursor-no-drop" : "bg-blue-500 cursor-pointer"}  text-white rounded-sm`} onClick={handleRedoDraw}>Redo</button>
          <select name="" id="" className='outline-1 p-1 px-4 rounded-sm'>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
          <input type="color" value="#0000FF" />
          <input type="range" />
        </div>

        <div
          onClick={handleElementPosition}
          className='relative outline-dashed outline-2 outline-blue-500 w-full h-80 rounded-md flex items-center justify-center overflow-hidden'
        >
          {
            showMessage &&
            <p className='text-xl text-center text-gray-600 pointer-events-none'>Click anywhere in this area to add a circle. <br /> Use Ctrl+Z to undo and Ctrl+Y to redo.</p>
          }
          {
            (showDraw && allCoordinates.length !== 0) &&
            allCoordinates.map((item) => {
              return <div key={item.id} className={`w-8 h-8 bg-red-500 absolute`} style={{ top: item.top - 16, left: item.left - 16 }}></div>
            })
          }

        </div>

      </section>
    </>
  )
}

export default App
