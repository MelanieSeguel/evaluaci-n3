import React, { useState, useEffect } from 'react';
import Formulario from './componentes/Formulario';
import Lista from './componentes/Lista';
import './css/App.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [contactos, setContactos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [mostrarAnimaciones, setMostrarAnimaciones] = useState(false); // Estado para controlar las animaciones

  const contactosPorPagina = 3;

  useEffect(() => {
    const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
    setContactos(contactosGuardados);
  }, []);

  const agregarContacto = (contacto) => {
    let nuevosContactos;
    if (contactoEnEdicion) {
      nuevosContactos = contactos.map((c) => (c.id === contactoEnEdicion.id ? { ...contacto, id: contactoEnEdicion.id } : c));
      setContactoEnEdicion(null);
    } else {
      nuevosContactos = [...contactos, { ...contacto, id: uuidv4() }];
      setMostrarAnimaciones(true); // Activar animaciones al agregar un nuevo contacto
      setTimeout(() => {
        setMostrarAnimaciones(false); // Desactivar animaciones después de un tiempo
      }, 1000); // Tiempo en milisegundos
    }
    setContactos(nuevosContactos);
    localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
  };

  const eliminarContacto = (id) => {
    const nuevosContactos = contactos.filter((c) => c.id !== id);
    setContactos(nuevosContactos);
    localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
  };

  const editarContacto = (id) => {
    const contacto = contactos.find((c) => c.id === id);
    setContactoEnEdicion(contacto);
  };

  const actualizarContacto = (id, contactoActualizado) => {
    const nuevosContactos = contactos.map((c) => (c.id === id ? contactoActualizado : c));
    setContactos(nuevosContactos);
    localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
  };

  const buscarContactos = (listaContactos, terminoBusqueda) => {
    if (!terminoBusqueda) {
      return listaContactos;
    }
    return listaContactos.filter(contacto =>
      contacto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      contacto.correo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      contacto.telefono.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  };

  const contactosOrdenados = contactos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  const contactosFiltrados = buscarContactos(contactosOrdenados, terminoBusqueda);

  const contactosMostrados = mostrarFavoritos 
    ? contactosFiltrados.filter(contacto => contacto.favorito)
    : contactosFiltrados;

  const indiceUltimoContacto = paginaActual * contactosPorPagina;
  const indicePrimerContacto = indiceUltimoContacto - contactosPorPagina;
  const contactosActuales = contactosMostrados.slice(indicePrimerContacto, indiceUltimoContacto);

  const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

  const numerosPagina = [];
  for (let i = 1; i <= Math.ceil(contactosMostrados.length / contactosPorPagina); i++) {
    numerosPagina.push(i);
  }

  return (
    <div className="main-container my-5 py-5">
      <div className="row mb-3">
        <div className="col-md-6">
          <h3 className="fw-bold mx-3 archivo-black-regular animacion-bg">AGREGAR CONTACTO</h3>
          <Formulario agregarContacto={agregarContacto} editarContacto={contactoEnEdicion} />
        </div>
        <div className="col-md-6 px-4">
          <h3 className="fw-bold mb-4 archivo-black-regular animacion-bg">DIRECTORIO DE CONTACTOS</h3>
          <input
            type="text"
            placeholder="Buscar contactos"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            className="form-control mb-3"
          />
          <button
            className="btn btn-morado mb-3"
            onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
          >
            {mostrarFavoritos ? 'Ver Todos' : 'Ver Favoritos'}
          </button>
          {contactosMostrados.length > 0 ? (
            <Lista
              contactos={contactosActuales}
              eliminarContacto={eliminarContacto}
              editarContacto={editarContacto}
              actualizarContacto={actualizarContacto}
              mostrarAnimaciones={mostrarAnimaciones} // Pasar el estado de las animaciones
            />
          ) : (
            <p>No se encontraron contactos.</p>
          )}
          <ul className="pagination mt-3">
            {numerosPagina.map(numero => (
              <li key={numero} className={`page-item ${numero === paginaActual ? 'custom-active' : ''}`}>
                <button className="page-link btn-morado" onClick={() => paginar(numero)}>
                  {numero}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
