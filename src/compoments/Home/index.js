import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

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
                    <label htmlFor="filter"></label>
                    <input 
                        type="text"
                        name="filter"
                        placeholder="Filter Contact"
                        id="filter"
                        onChange={(e) => { const {value} = e.target; setFilterData(value) }}
                    />
                </div>
            </header>
            <header className="align-right">
                <Link to="contact">
                    Cadastrar Contato
                    <FiPlus/>
                </Link>
            </header>
            <main>
                <ul className="items-grid">
                    {contactsList.map(item => (
                        <li 
                            data-contactitem="true"
                            key={item.id}
                            onClick={() => history.push(`contact/${item.id}`) }
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