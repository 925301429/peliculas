import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Películas predeterminadas
  const [peliculas] = useState([
    {
      id: 1,
      titulo: "demon slayer",
      descripcion: "Película de anime.",
      imagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sensacine.com%2Fseries%2Fserie-25661%2F&psig=AOvVaw3CLWI328RBgpYNct3jd1Jg&ust=1764944413103000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJCCuY-rpJEDFQAAAAAdAAAAABAE"
    },
    {
      id: 2,
      titulo: "la tormenta",
      descripcion: "novela",
      imagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.atresplayer.com%2Fnovelas-nova%2Ftelenovelas%2Fla-tormenta%2Ftemporada-1%2F&psig=AOvVaw3WtE_iyieeeW7qEXJfDFmc&ust=1764944475935000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPj04q2rpJEDFQAAAAAdAAAAABAE"
    },
    {
      id: 3,
      titulo: "goku",
      descripcion: "anime",
      imagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdble.bn-ent.net%2Fnews%2Fes%2Fcharacter%2F4743%2F&psig=AOvVaw0HpU1QaXPTcG4Ctc7XbFPo&ust=1764944572550000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLiKuturpJEDFQAAAAAdAAAAABAL"
    }
  ]);

  // Favoritos
  const [favoritos, setFavoritos] = useState([]);

  // Mis películas (las que tú agregas manualmente)
  const [misPeliculas, setMisPeliculas] = useState([]);

  // Inputs del formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  // Cargar "Mis Películas" desde localStorage
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("misPeliculas"));
    if (guardadas) setMisPeliculas(guardadas);
  }, []);

  // Guardar automáticamente en localStorage
  useEffect(() => {
    localStorage.setItem("misPeliculas", JSON.stringify(misPeliculas));
  }, [misPeliculas]);

  const agregarFavorito = (pelicula) => {
    if (!favoritos.some((fav) => fav.id === pelicula.id)) {
      setFavoritos([...favoritos, pelicula]);
    }
  };

  const eliminarFavorito = (id) => {
    setFavoritos(favoritos.filter((fav) => fav.id !== id));
  };

  const agregarMiPelicula = () => {
    if (titulo.trim() === "" || descripcion.trim() === "" || imagen.trim() === "") return;

    const nuevaPelicula = {
      id: Date.now(),
      titulo,
      descripcion,
      imagen
    };

    setMisPeliculas([...misPeliculas, nuevaPelicula]);

    // Limpiar inputs
    setTitulo("");
    setDescripcion("");
    setImagen("");
  };

  const eliminarMiPelicula = (id) => {
    setMisPeliculas(misPeliculas.filter((p) => p.id !== id));
  };

  return (
    <div className="contenedor">

      {/* Películas predeterminadas */}
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

      {/* Favoritos */}
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

      {/* NUEVA SECCIÓN: MIS PELÍCULAS */}
      <h2 className="titulo-seccion">🎟️ Mis Películas</h2>

      <div className="formulario">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enlace de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <button className="btn agregar" onClick={agregarMiPelicula}>
          ➕ Agregar Película
        </button>
      </div>

      <div className="galeria">
        {misPeliculas.map((peli) => (
          <div className="tarjeta" key={peli.id}>
            <img src={peli.imagen} alt={peli.titulo} className="imagen" />
            <div className="info">
              <h3>{peli.titulo}</h3>
              <p>{peli.descripcion}</p>

              <button className="btn eliminar" onClick={() => eliminarMiPelicula(peli.id)}>
                ❌ Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
