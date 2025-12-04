// App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("all");
  const [seleccionada, setSeleccionada] = useState(null);

  const API = "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=es";

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setPeliculas(data.results || []));
  }, []);

  const filtrarPeliculas = peliculas.filter((p) => {
    const coincideBusqueda = p.title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "all" || (p.genre_ids && p.genre_ids.includes(Number(categoria)));
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="container">
      <h1 className="titulo">🎬 Películas Destacadas</h1>

      <div className="acciones">
        <input
          className="input"
          type="text"
          placeholder="Buscar película..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select className="select" onChange={(e) => setCategoria(e.target.value)}>
          <option value="all">Todas</option>
          <option value="28">Acción</option>
          <option value="27">Terror</option>
          <option value="10749">Romance</option>
          <option value="35">Comedia</option>
        </select>
      </div>

      <div className="carrusel">
        {peliculas.slice(0, 5).map((p) => (
          <img
            key={p.id}
            src={`https://image.tmdb.org/t/p/w300${p.poster_path}`}
            alt={p.title}
          />
        ))}
      </div>

      <div className="grid">
        {filtrarPeliculas.map((p) => (
          <div key={p.id} className="card" onClick={() => setSeleccionada(p)}>
            <div className="img-wrapper">
              <img src={`https://image.tmdb.org/t/p/w300${p.poster_path}`} alt={p.title} />
            </div>
            <h2>{p.title}</h2>
            <button className="btn">Ver Detalles</button>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div className="modal" onClick={() => setSeleccionada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{seleccionada.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w300${seleccionada.poster_path}`} alt="" />
            <p>{seleccionada.overview}</p>
            <button className="cerrar" onClick={() => setSeleccionada(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
