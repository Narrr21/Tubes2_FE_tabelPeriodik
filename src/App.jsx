import React, { useState, useRef } from "react";
import Loading from "./loading.jsx";
import Title from "./Title.jsx";
import Footer from "./Footer.jsx";
import MyTree from "./Tree.jsx";

const App = () => {
  const [elmtName, setElmtName] = useState("");
  const [inputValue, setInputValue] = useState(1);
  const [Delay, setDelay] = useState(0);
  const [searching, setSearching] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [live, setLive] = useState(0);
  const [searchType, setSearchType] = useState("BFS");
  const [leftType, setLeftType] = useState("DFS");
  const [rightType, setRightType] = useState("DFS");

  const image = import.meta.glob("/src/assets/elements/*.svg", {
    eager: true,
    import: "default",
  });

  const elements = Object.keys(image).map((path) => {
    const name = path.split("/").pop().split(".")[0];
    return name;
  });

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomAmount = 0.1;
    const newScale = e.deltaY < 0 ? scale + zoomAmount : scale - zoomAmount;
    if (newScale >= 0.2 && newScale <= 5) {
      setScale(newScale);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setLastMouse({ x: e.clientX, y: e.clientY });
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleShow = async () => {
    setSearching(false);
    setPosition({ x: 0, y: 0 });
    setScale(1);
    setTimeout(() => {
      setSearching(true);
    }, 0);
  };

  const handleHide = () => {
    setSearching(false);
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <main className="min-h-screen flex-col items-center justify-center self-center text-4xl py-5 w-screen bg-slate-800">
      <div className="py-3 justify-center">
        <Title />
        <div className="flex flex-col align-center justify-center items-center mt-5">
          <h2 className="text-3xl font-bold text-center text-white py-1 my-2">
            Pilih Elemen yang ingin ditampilkan
          </h2>
          <div className="flex items-center justify-center">
            <input
              className="bg-cyan-700 text-white p-2 rounded"
              type="text"
              value={elmtName}
              onChange={(e) => setElmtName(e.target.value)}
              placeholder="Enter element name"
            />
          </div>
          <div
            className="flex overflow-x-auto gap-8 py-4 px-4 my-4"
            style={{
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#0891b2 #f5f5f5", // cyan-700 for thumb, slate-700 for track (in hex)
            }}
          >
            {elements.map((element) => (
              <img
                key={element}
                src={image[`/src/assets/elements/${element}.svg`]}
                onClick={() => {
                  setElmtName(element);
                }}
                alt={element}
                className="w-28 h-28 p-4 rounded-lg border-2 border-slate-700 
                          hover:border-cyan-300 
                          bg-gradient-to-br from-slate-800 to-slate-700 
                          shadow-md hover:shadow-cyan-500/30 
                          object-cover cursor-pointer transform hover:scale-125
                          transition-colors duration-300 ease-in-out"
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 py-3 border-4 rounded-2xl w-[40vw] px-5 my-5">
            <fieldset className="flex gap-6 flex-wrap justify-center">
              <label className="flex items-center gap-4 text-white">
                Number of Recipes:
                <input
                  type="number"
                  min={1}
                  className="ml-4 p-2 rounded bg-slate-700 text-white w-24"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Minimal"
                />
              </label>
            </fieldset>

            <fieldset className="flex gap-6 flex-wrap justify-center">
              <label className="flex items-center gap-4 text-white">
                <input
                  type="checkbox"
                  className="scale-200 accent-white"
                  name="live"
                  checked={live}
                  onChange={() => setLive((prev) => !prev)}
                />
                Live Search
              </label>
            </fieldset>
            {live && (
              <fieldset className="flex gap-6 flex-wrap justify-center">
                <label>
                  Delay (ms) :
                  <input
                    type="number"
                    min={1}
                    className="ml-4 p-2 rounded bg-slate-700 text-white w-24"
                    value={Delay}
                    onChange={(e) => setDelay(e.target.value)}
                    placeholder="Minimal"
                  />
                </label>
              </fieldset>
            )}

            <fieldset className="flex gap-6 flex-wrap justify-center">
              <label className="flex items-center gap-4 text-white">
                <input
                  type="radio"
                  className="scale-200 accent-white"
                  name="search-type"
                  value="BFS"
                  checked={searchType === "BFS"}
                  onChange={() => setSearchType("BFS")}
                />
                BFS
              </label>
              <label className="flex items-center gap-4 text-white">
                <input
                  type="radio"
                  className="scale-200 accent-white"
                  name="search-type"
                  value="DFS"
                  checked={searchType === "DFS"}
                  onChange={() => setSearchType("DFS")}
                />
                DFS
              </label>
              <label className="flex items-center gap-4 text-white">
                <input
                  type="radio"
                  className="scale-200 accent-white"
                  name="search-type"
                  value="Bidirectional"
                  checked={searchType === "Bidirectional"}
                  onChange={() => setSearchType("Bidirectional")}
                />
                Bidirectional
              </label>
            </fieldset>

            {searchType === "Bidirectional" && (
              <fieldset className="flex gap-6 flex-wrap justify-center">
                <label className="flex items-center gap-4 text-white">
                  <input
                    type="radio"
                    className="scale-200 accent-white"
                    name="left-type"
                    value="DFS"
                    checked={leftType === "DFS"}
                    onChange={() => setLeftType("DFS")}
                  />
                  Left DFS
                </label>
                <label className="flex items-center gap-4 text-white">
                  <input
                    type="radio"
                    className="scale-200 accent-white"
                    name="left-type"
                    value="BFS"
                    checked={leftType === "BFS"}
                    onChange={() => setLeftType("BFS")}
                  />
                  Left BFS
                </label>
                <label className="flex items-center gap-4 text-white">
                  <input
                    type="radio"
                    className="scale-200 accent-white"
                    name="right-type"
                    value="DFS"
                    checked={rightType === "DFS"}
                    onChange={() => setRightType("DFS")}
                  />
                  Right DFS
                </label>
                <label className="flex items-center gap-4 text-white">
                  <input
                    type="radio"
                    className="scale-200 accent-white"
                    name="right-type"
                    value="BFS"
                    checked={rightType === "BFS"}
                    onChange={() => setRightType("BFS")}
                  />
                  Right BFS
                </label>
              </fieldset>
            )}
            <button
              onClick={handleShow}
              className="py-2 px-4 rounded bg-cyan-700 hover:bg-cyan-800 text-white transition duration-300"
            >
              Search
            </button>
          </div>
          {searching && (
            <div className="flex flex-col items-center mt-4 gap-4 ">
              <button
                onClick={handleHide}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ease-in-out duration-300"
              >
                Remove
              </button>

              <div
                className="w-[90vw] h-[70vh]  bg-cyan-500 overflow-hidden flex items-center justify-center border rounded cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                <div
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: "0 0",
                    transition: isDragging ? "none" : "transform 0.1s ease-out",
                  }}
                >
                  <MyTree
                    search={searchType}
                    name={elmtName}
                    recipeAmount={inputValue}
                    left={leftType}
                    right={rightType}
                    live={live}
                    delay={Delay}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default App;
