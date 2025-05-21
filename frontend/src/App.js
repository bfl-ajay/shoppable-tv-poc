import React, { useEffect, useState } from "react";
import ProductOverlay from "./ProductOverlay";
import VideoPlayer from "./VideoPlayer";

// For Docker Compose, set REACT_APP_API_BASE in docker-compose.yml
const API_BASE = process.env.REACT_APP_API_BASE || "";

function App() {
  const [scene, setScene] = useState(10);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products?scene=${scene}`)
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, [scene]);

  return (
    <div>
      <h2>Shoppable TV Demo</h2>
      <VideoPlayer onSceneChange={setScene} />
      <ProductOverlay products={products} />
    </div>
  );
}

export default App;
