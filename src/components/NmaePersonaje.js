import React from "react";

export default function NmaePersonaje({ data }) {
  
  return (
    <div>
      {data.id % 2 !== 0 && (
        <div>
          <h1>Es impar : {data.id}</h1>
          <div>name : {data.name}</div>
        </div>
      )}
    </div>
  );
}
