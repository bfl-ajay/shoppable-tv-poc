import React, { useState } from "react";

export default function ProductOverlay({ products }) {
  const [selected, setSelected] = useState(null);

  if (!products.length) return null;

  return (
    <div>
      <div style={{ position: "absolute", top: 80, left: 500, zIndex: 2 }}>
        {products.map((p) => (
          <button key={p.id} onClick={() => setSelected(p)} style={{ margin: 8 }}>
            <img src={p.image} alt={p.name} width={80} /><br />
            {p.name}
          </button>
        ))}
      </div>
      {selected && (
        <div
          style={{
            position: "fixed", top: "30%", left: "35%", background: "#fff", padding: 32, border: "1px solid #888",
            zIndex: 5,
          }}>
          <img src={selected.image} alt={selected.name} width={120} /><br />
          <b>{selected.name}</b><br />₹{selected.price}
          <form
            onSubmit={e => {
              e.preventDefault();
              fetch("http://localhost:4000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...selected, when: Date.now() })
              }).then(() => alert("Order Placed!"));
              setSelected(null);
            }}>
            <button type="submit">Buy Now</button>
            <button type="button" onClick={() => setSelected(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
