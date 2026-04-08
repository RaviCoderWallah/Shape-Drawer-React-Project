import { useState } from 'react';
import './App.css'

function App() {

  const [allCoordinates, setAllCoordinates] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [showDraw, setShowDraw] = useState(false);
  const [redoStack, setRedoStack] = useState([]);

  const [drawType, setDrawType] = useState("circle");
  const [drawColor, setDrawColor] = useState("#0000FF");
  const [drawSize, setDrawSize] = useState(25);

  const handleElementPosition = (event) => {

    setShowMessage(false);
    setShowDraw(true);
    setRedoStack([]); //On every shape draw happen, clear redo stack, until undo is not clicked

    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();

    const newTop = event.clientY - rect.y;
    const newLeft = event.clientX - rect.x;

    setAllCoordinates((prev) => [...prev, { top: newTop, left: newLeft, shape: (drawType === "circle" ? 50 : 0), shapeColor: drawColor, shapeSize: drawSize, id: crypto.randomUUID() }]);
  }

  //For Clear Drawer 
  const handleClearDraw = () => {
    setAllCoordinates([]);
    setRedoStack([]);
    setShowMessage(true);
  }

  //For Undo Drawer 
  const handleUndoDraw = () => {

    //For preventing app crashes 
    if(allCoordinates.length == 0) return;

    //When click someone on undo then first remove last element in allcoordinates array, so screen render and show remove last element
    setAllCoordinates((prev) => {
      return prev.slice(0, -1);
    });

    //Get lastelement and add in redo stack so after click undo user can click on redo.
    const lastElement = allCoordinates[allCoordinates.length - 1];
    setRedoStack((prev) => [...prev, lastElement]);
  }

  //For Redo Drawer
  const handleRedoDraw = () => {

     //For preventing app crashes 
    if(redoStack.length == 0) return;

    //When click on redo button first we have last element in redo stack. 
    const lastElementInRedoStack = redoStack[redoStack.length - 1];

    //Now add allcoordinates array so in ui show recent undo items
    setAllCoordinates((prev) => [...prev, lastElementInRedoStack]);

    //Now remove item in redo stack, which render on ui
    setRedoStack((prev) => {
      return prev.slice(0, -1)
    });
  }

  //For handle shape draw type - circle or square 
  const handleShapeDrawType = (event) => {
    setDrawType(event.target.value);
  }

  //For handle shape draw color
  const handleShapeDrawColor = (event) => {
    setDrawColor(event.target.value);
  }

  //For handle shape draw size
  const handleShapeDrawSize = (event) => {
    setDrawSize(event.target.value);
  }

  return (
    <>
      <section className='max-w-4xl mx-auto py-8 flex flex-col items-center gap-8'>
        <h1 className='text-2xl text-center'>Shape Drawer</h1>

        <div className='flex items-center gap-4'>
          <button className='p-1 px-4 bg-blue-500 text-white rounded-sm' onClick={handleClearDraw}>Clear</button>
          <button className={`p-1 px-4 ${allCoordinates.length === 0 ? "bg-gray-300 cursor-no-drop" : "bg-blue-500 cursor-pointer"}  text-white rounded-sm`} onClick={handleUndoDraw}>Undo</button>
          <button className={`p-1 px-4 ${redoStack.length === 0 ? "bg-gray-300 cursor-no-drop" : "bg-blue-500 cursor-pointer"}  text-white rounded-sm`} onClick={handleRedoDraw}>Redo</button>
          <select name="" id="" value={drawType} onChange={handleShapeDrawType} className='outline-1 p-1 px-4 rounded-sm'>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
          <input type="color" value={drawColor} onChange={handleShapeDrawColor} />
          <input type="range" min={10} max={50} value={drawSize} onChange={handleShapeDrawSize} />
        </div>

        <div
          onClick={handleElementPosition}
          className='relative outline-dashed outline-2 outline-blue-500 w-full h-80 rounded-md flex items-center justify-center overflow-hidden'
        >
          {
            showMessage &&
            <p className='text-xl text-center text-gray-600 pointer-events-none'>
              Click anywhere in this area to add a {drawType === "circle" ? "circle" : "square"}. <br />
            </p>
          }
          {
            (showDraw && allCoordinates.length !== 0) &&
            allCoordinates.map((item) => {
              return <div key={item.id} className={`absolute`} style={{ top: item.top - 16, left: item.left - 16, borderRadius: item.shape, backgroundColor: item.shapeColor, width: item.shapeSize + "px", height: item.shapeSize + "px"}}></div>
            })
          }

        </div>

      </section>
    </>
  )
}

export default App
