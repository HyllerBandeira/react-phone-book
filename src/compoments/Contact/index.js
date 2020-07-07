import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

const CreatePoint = (props) => {
    const { isCreate, isShow, isEdit } = props;
    const { id } = useParams();
    const history = useHistory();

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    useEffect(() => {    
        if (!isCreate) {
            api.get(`contacts/${id}`)
                .then(response => {
                    setFormData(response.data)
                }).catch(error => {
                    alert('Contato não identificado')
                    history.push('/')
                })
        }
    }, [ id, isCreate ])

    function handleInputChange(event) {
       const { name, value } = event.target;

       setFormData({
           ...formData,
           [name]: value,
       })
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        
        const data = {
            ...formData
        }

        if (isCreate) {
            const response = await api.post('contacts', data)
                .then(response => {
                    alert("Contato criado!");
                    history.push('/');
                }).catch(error => {
                    alert(error.response.data.erros);
                });

        } else if (isShow) {
           history.push(`${id}/edit`);
        } else {
            await api.put(`contacts/${id}`, data)
            .then(response => {
                alert("Contato editado!");
                history.push('/');
            }).catch(error => {
                alert(error.response.data.erros);
            });
        }

    }

    return (
        <div id="page-create-point">
            <header>
                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleFormSubmit}>

                <fieldset>
                    <legend>
                        <h1>Cadastro de Contato</h1>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            aria-label="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={isShow}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                aria-label="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isShow}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="phone">Whatsapp</label>
                            <InputMask 
                                type="text"
                                name="phone"
                                id="phone"
                                aria-label="phone"
                                mask="(99) 99999-9999"
                                value={formData.phone}
                                onChange={handleInputChange}
                                disabled={isShow}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="address">Endereço</label>
                        <input 
                            type="text"
                            name="address"
                            id="address"
                            aria-label="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={isShow}
                        />
                    </div>
                </fieldset>
                <button id="submit-button">
                    { (isCreate)? `Cadastrar Contato`: (isShow)? `Editar Contato`: `Salvar Contato` }
                </button>
            </form>
        </div>
    )
};

export default CreatePoint;