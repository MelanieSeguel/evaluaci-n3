import React from 'react';
import imagenPorDefecto from '../imagenes/incognito.jpg';
import '../css/App.css';
import { BsStar, BsStarFill, BsPencil} from 'react-icons/bs'; // Importa el icono de equis

const Lista = ({ contactos, eliminarContacto, editarContacto, actualizarContacto }) => {
  const toggleFavorito = (id) => {
    const contacto = contactos.find(c => c.id === id);
    actualizarContacto(id, { ...contacto, favorito: !contacto.favorito });
  };

  return (
    <div className='container px-4'>
      {contactos.map((contacto) => (
        <div key={contacto.id} className={`card mb-3 ${contacto.favorito ? 'favorito' : ''}`}>
          <div className="card-header">
            <button className={`btn ${contacto.favorito ? 'btn-warning' : 'btn-outline-secondary'} btn-sm float-end`} onClick={() => toggleFavorito(contacto.id)}>
              {contacto.favorito ? <BsStarFill /> : <BsStar />}
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img
                src={contacto.foto || imagenPorDefecto}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = imagenPorDefecto;
                }}
                className="animacion-borderfoto"
                style={{ width: '80px', height: '80px', objectFit: 'cover', border: '2px solid #ccc', marginRight: '20px' }}
                alt="Foto de perfil"
              />
              <div>
                <h5 className="card-title">{contacto.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{contacto.correo}</h6>
                <p className="card-text">{contacto.telefono}</p>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-outline-primary btn-morado me-2" onClick={() => editarContacto(contacto.id)}>
                <BsPencil className="me-1" /> Editar
              </button>
              <button className="btn btn-outline-danger me-2" onClick={() => eliminarContacto(contacto.id)}>
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lista;
