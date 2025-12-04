import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Simulación de videos (puedes reemplazar con tu API)
  const mockVideos = [
    { id: 1, title: "Lone Wolf McQuade", year: 1983, img: "https://i.imgur.com/i0T19sW.jpeg" },
    { id: 2, title: "What’s The Worst That Could Happen?", year: 2001, img: "https://i.imgur.com/pDT7Hle.jpeg" },
    { id: 3, title: "The Escort", year: 2016, img: "https://i.imgur.com/pxEcKIp.jpeg" },
    { id: 4, title: "Contagion", year: 2011, img: "https://i.imgur.com/LOmM2Pt.jpeg" },
    { id: 5, title: "Jumanji", year: 1995, img: "https://i.imgur.com/DTK5eY3.jpeg" },
  ];

  useEffect(() => {
    setVideos(mockVideos);

    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  const toggleFavorite = (video) => {
    let updated;
    if (favorites.some((v) => v.id === video.id)) {
      updated = favorites.filter((v) => v.id !== video.id); // ❌ borrar favorito
    } else {
      updated = [...favorites, video]; // ⭐ agregar favorito
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* 🔍 buscador */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ⭐ Bloque de Favoritos */}
      {favorites.length > 0 && (
        <div className="section">
          <h3>⭐ Favoritos</h3>
          <div className="scroll-row">
            {favorites.map((v) => (
              <Card
                key={v.id}
                video={v}
                toggleFavorite={toggleFavorite}
                isFavorite
              />
            ))}
          </div>
        </div>
      )}

      {/* 🎬 Sección carrusel horizontal */}
      <div className="section">
        <h3>Videos gratuitos</h3>
        <div className="scroll-row">
          {filteredVideos.map((v) => (
            <Card
              key={v.id}
              video={v}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((f) => f.id === v.id)}
            />
          ))}
        </div>
      </div>

      {/* 📜 Lista vertical (como imagen derecha) */}
      <h3 className="list-title">Videos gratis</h3>
      <div className="vertical-list">
        {filteredVideos.map((v) => (
          <div key={v.id} className="list-item">
            <img src={v.img} alt={v.title} />

            <div className="info">
              <h4>{v.title}</h4>
              <p>Películas • {v.year}</p>
            </div>

            <button
              className="fav-btn"
              onClick={() => toggleFavorite(v)}
            >
              {favorites.some((f) => f.id === v.id) ? "💔" : "❤️"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ video, toggleFavorite, isFavorite }) {
  return (
    <div className="card">
      <img src={video.img} alt={video.title} />
      <p className="title">{video.title}</p>
      <p className="year">{video.year}</p>
      <button className="fav-small" onClick={() => toggleFavorite(video)}>
        {isFavorite ? "💔" : "❤️"}
      </button>
    </div>
  );
}
