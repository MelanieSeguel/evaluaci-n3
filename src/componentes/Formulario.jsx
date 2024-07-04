import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulario = ({ agregarContacto, editarContacto }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errores, setErrores] = useState({
    nombre: '',
    correo: '',
    telefono: ''
  });
  const [exito, setExito] = useState('');

  useEffect(() => {
    if (editarContacto) {
      setNombre(editarContacto.nombre || '');
      setCorreo(editarContacto.correo || '');
      setTelefono(editarContacto.telefono || '');
    } else {
      setNombre('');
      setCorreo('');
      setTelefono('');
    }
  }, [editarContacto]);

  const validarFormulario = () => {
    let errores = {};

    if (!nombre.trim()) {
      errores.nombre = 'Debe ingresar un nombre';
    }

    if (!/\S+@\S+\.\S+/.test(correo)) {
      errores.correo = 'El correo no tiene un formato válido';
    }

    if (!/^\d{9}$/.test(telefono)) {
      errores.telefono = 'El teléfono debe tener 9 números';
    }

    setErrores(errores); // Actualizar el estado de errores
    return Object.keys(errores).length === 0; // Devolver verdadero si no hay errores
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      agregarContacto({ nombre, correo, telefono });
      setExito('Contacto agregado exitosamente');
      setNombre('');
      setCorreo('');
      setTelefono('');
    } else {
      toast.error('Por favor, corrige los errores del formulario');
    }
  };

  return (
    <div className="container mx-4">
      <form onSubmit={manejarEnvio} noValidate>
        <div className="row mb-3">
          <div className="col-md-11">
            <div className="form-group">
              <label htmlFor="formNombre">Nombre</label>
              <input
                type="text"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                id="formNombre"
                placeholder="Ingrese nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errores.nombre && (
                <div className="invalid-feedback">{errores.nombre}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-11">
            <div className="form-group">
              <label htmlFor="formCorreo">Correo</label>
              <input
                type="email"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                id="formCorreo"
                placeholder="Ingrese correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              {errores.correo && (
                <div className="invalid-feedback">{errores.correo}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-11">
            <div className="form-group">
              <label htmlFor="formTelefono">Teléfono</label>
              <input
                type="text"
                className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                id="formTelefono"
                placeholder="Ingrese teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              {errores.telefono && (
                <div className="invalid-feedback">{errores.telefono}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
          <button
              className="btn btn-outline-primary animacion-border btn-morado"
              type="submit"
              onClick={manejarEnvio}
            >
              {editarContacto ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </div>

        {exito && <div className="success-text">{exito}</div>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Formulario;
