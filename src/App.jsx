import React, { useState, useRef } from "react";
import Loading from "./loading.jsx";
import Title from "./Title.jsx";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [recipeType, setRecipeType] = useState("single");
  const [searchType, setSearchType] = useState("BFS");
  const [isBidirectional, setIsBidirectional] = useState(false);

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

  const handleShow = async (recipeType, searchType, bidirectional) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const response = await fetch(
        "http://localhost:3000/" + searchType + "/" + inputValue,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: inputValue,
            recipeType,
            bidirectional,
          }),
        }
      );

      const data = await response.json();
      if (data.output) {
        setImageUrl(data.output);
      } else {
        console.error("No output in response:", data);
        setImageUrl("def.jpg");
      }
    } catch (error) {
      setImageUrl("def.jpg");
      console.error("API call failed:", error);
    }
    setLoading(false);
  };

  const handleHide = () => {
    setImageUrl("");
  };

  return (
    <main className="min-h-screen flex-col items-center justify-center self-center text-4xl py-5 w-screen">
      <div className="py-3 justify-center">
        <Title />
        <div className="flex flex-col align-center justify-center items-center mt-5">
          <h2 className="text-3xl font-bold text-center py-1 my-2">
            Pilih Elemen yang ingin ditampilkan
          </h2>
          <div className="flex items-center justify-center">
            <input
              className="bg-cyan-700 text-white p-2 rounded"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter element name"
            />
          </div>
          <div
            className="flex overflow-x-auto gap-4 py-4 px-4 my-4"
            style={{
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#0e4a63 #f5f5f5", // cyan-700 for thumb, slate-700 for track (in hex)
            }}
          >
            {elements.map((element) => (
              <img
                key={element}
                src={image[`/src/assets/elements/${element}.svg`]}
                alt={element}
                className="w-28 h-28 rounded-lg border-2 border-slate-700 hover:border-cyan-300 bg-gradient-to-br from-slate-800 to-slate-700 shadow-md hover:shadow-cyan-500/30  p-4 object-cover cursor-pointer transition duration-300 ease-in-out"
                onClick={() => {
                  setInputValue(element);
                }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 py-3 border-4 rounded-2xl w-fit px-5 my-5">
            <fieldset className="flex gap-6 flex-wrap justify-center">
              <label className="flex items-center gap-4 text-white">
                <input
                  type="radio"
                  className="scale-200 accent-white"
                  name="recipe-type"
                  value="single"
                  checked={recipeType === "single"}
                  onChange={() => setRecipeType("single")}
                />
                Single Recipe
              </label>
              <label className="flex items-center gap-4 text-white">
                <input
                  type="radio"
                  className="scale-200 accent-white"
                  name="recipe-type"
                  value="multiple"
                  checked={recipeType === "multiple"}
                  onChange={() => setRecipeType("multiple")}
                />
                Multiple Recipe
              </label>
            </fieldset>

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
            </fieldset>

            <label className="flex items-center gap-4 text-white">
              <input
                type="checkbox"
                className="scale-200 accent-white"
                name="bidirectional"
                checked={isBidirectional}
                onChange={(e) => setIsBidirectional(e.target.checked)}
              />
              Bidirectional
            </label>

            <button
              onClick={() =>
                handleShow(recipeType, searchType, isBidirectional)
              }
              className="bg-black hover:bg-white hover:text-black text-white py-2 px-4 rounded transition ease-in-out duration-300"
            >
              Search
            </button>
          </div>
          {loading && <Loading />}
          {imageUrl && !loading && (
            <div className="flex flex-col items-center mt-4 gap-4">
              <button
                onClick={handleHide}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ease-in-out duration-300"
              >
                Remove
              </button>

              <div
                className="w-[90vw] h-[70vh] overflow-hidden border rounded bg-white cursor-grab active:cursor-grabbing"
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
                  <img
                    src={imageUrl}
                    alt="API Result"
                    className="pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
