import React, { useState } from "react";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShow = async (input) => {
    setLoading(true);
    try {
      const response = await fetch("https://your-api-endpoint.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input })
      });

      const data = await response.json();
      if (data.output) {
        setImageUrl(data.output);
      } else {
        console.error("No output in response:", data);
        setImageUrl("def.jpg"); // fallback image
      }
    } catch (error) {
      setImageUrl("def.jpg"); // fallback image
      console.error("API call failed:", error);
    }
    setLoading(false);
  };

  const handleHide = () => {
    setImageUrl("");
  };

  return (
    <main className="bg-blue-400 min-h-screen flex-col items-center justify-center self-center text-4xl py-5 w-screen">
      <div className="bg-red-400 py-3 justify-center">
        <h1 className="bg-green-400 text-4xl font-bold text-center py-1">Tabel Periodik</h1>
        <div className="bg-amber-400 flex flex-col">
          <div className="flex justify-center gap-4 py-3">
            <button 
              onClick={() => handleShow("Babi")}
              className="bg-black hover:bg-white hover:text-black py-2 px-4 rounded ease-in-out duration-300"
            >
              Babi
            </button>
            <button 
              onClick={() => handleShow("Babi2")}
              className="bg-black hover:bg-white hover:text-black py-2 px-4 rounded ease-in-out duration-300"
            >
              Babi2
            </button>
          </div>

          {loading && (
            <p className="text-white text-center">Loading...</p>
          )}

          {imageUrl && !loading && (
            <div className="flex flex-col items-center mt-4 gap-4">
              <button 
                onClick={handleHide}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ease-in-out duration-300"
              >
                Remove
              </button>
              <img src={imageUrl} alt="API Result" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;