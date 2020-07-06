import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import axios from 'axios'

const CreatePoint = () => {

    const [ FilterData, setFilterData ] = useState('');
    const [ contactsList, setContactsList ] = useState([]);

    useEffect(() => {
        api.get('contacts', { params: { name: FilterData } })
            .then(response => {
                setContactsList(response.data)
            })
    }, [FilterData])

    const history = useHistory();

    return (
        <div id="page-list-contact">
            <header>
                <div className="field">
                    <label htmlFor="name"></label>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Filter Contact"
                        id="name"
                        onChange={(e) => { const {name, value} = e.target; setFilterData(value) }}
                    />
                </div>
            </header>
            <header className="align-right">
                <Link to="/create">
                    Cadastrar Contato
                    <FiPlus/>
                </Link>
            </header>
            <main>
                <ul className="items-grid">
                    {contactsList.map(item => (
                        <li 
                            key={item.id}
                            onClick={() => history.push(`${item.id}`) }
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
};

export default CreatePoint;