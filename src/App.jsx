import React, { useState } from "react";
import "./App.css";

function App() {
  // Lista de películas (puedes agregar más)
  const [peliculas] = useState([
    {
      id: 1,
      titulo: "Lone Wolf McQuade",
      descripcion: "Película de acción clásica.",
      imagen: "https://m.media-amazon.com/images/I/81+jNVOUsJL._AC_UF894,1000_QL80_.jpg"
    },
    {
      id: 2,
      titulo: "The Escort",
      descripcion: "Drama romántico.",
      imagen: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg"
    },
    {
      id: 3,
      titulo: "What's the Worst That Could Happen?",
      descripcion: "Comedia divertida.",
      imagen: "https://m.media-amazon.com/images/I/71vT0Sx1o6L._AC_UF894,1000_QL80_.jpg"
    }
  ]);

  // Favoritos
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (pelicula) => {
    if (!favoritos.some((fav) => fav.id === pelicula.id)) {
      setFavoritos([...favoritos, pelicula]);
    }
  };

  const eliminarFavorito = (id) => {
    setFavoritos(favoritos.filter((fav) => fav.id !== id));
  };

  return (
    <div className="contenedor">
      <h2 className="titulo-seccion">🎬 Películas Gratis</h2>

      <div className="galeria">
        {peliculas.map((peli) => (
          <div className="tarjeta" key={peli.id}>
            <img src={peli.imagen} alt={peli.titulo} className="imagen" />

            <div className="info">
              <h3>{peli.titulo}</h3>
              <p>{peli.descripcion}</p>

              {favoritos.some((fav) => fav.id === peli.id) ? (
                <button className="btn eliminar" onClick={() => eliminarFavorito(peli.id)}>
                  ❌ Quitar de Favoritos
                </button>
              ) : (
                <button className="btn agregar" onClick={() => agregarFavorito(peli)}>
                  ⭐ Agregar a Favoritos
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="titulo-seccion">⭐ Tus Favoritos</h2>

      {favoritos.length === 0 && <p className="vacio">No tienes favoritos aún.</p>}

      <div className="galeria">
        {favoritos.map((fav) => (
          <div className="tarjeta" key={fav.id}>
            <img src={fav.imagen} alt={fav.titulo} className="imagen" />

            <div className="info">
              <h3>{fav.titulo}</h3>
              <p>{fav.descripcion}</p>

              <button className="btn eliminar" onClick={() => eliminarFavorito(fav.id)}>
                ❌ Quitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
