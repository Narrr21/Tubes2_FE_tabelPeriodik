import React, { useState } from "react";

const App = () => {
  const [showImage, setShowImage] = useState(false);

  const handleShow = () => {
    setShowImage(true);
    // placeholder: you can put other logic here
    console.log("Button clicked!");
  };

  const handleHide = () => {
    setShowImage(false);
  };

  return (
    <main className="bg-blue-400 min-h-screen flex-col items-center justify-center self-center text-4xl py-5 w-screen">
      <div className="bg-red-400 py-3 justify-center">
        <h1 className="bg-green-400 text-4xl font-bold text-center py-1">Tabel Periodik</h1>
        <div className="bg-amber-400 flex flex-col">
          <div className="flex justify-center gap-4 py-3">
            <button 
              onClick={handleShow}
              className="bg-black hover:bg-white hover:text-black py-2 px-4 rounded ease-in-out duration-300"
            >
              <a className="" href="#">Babi</a> {/* href="#" to prevent link jump */}
            </button>
            <button 
              className="bg-black hover:bg-white hover:text-black py-2 px-4 rounded ease-in-out duration-300"
            >
              <a className="" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Babi2</a>
            </button>
          </div>
          {showImage && (
              <div className="flex flex-col items-center mt-4 gap-4">
                <button 
                  onClick={handleHide}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ease-in-out duration-300"
                >
                  Remove
                </button>
                <img src="def.jpg" alt="Extra" />
              </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default App;