import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent, queryByAttribute, cleanup, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from "./App";
import axiosMocked from "axios";

afterEach(cleanup)

// Methods to handle custons DOM search
const getById = queryByAttribute.bind(null, 'id');
const getByContactItem = queryByAttribute.bind(null, 'data-contactitem');
const getByValue = queryByAttribute.bind(null, 'value');


// Render Home Page TEST
test('Home Page/rendering', async () => {
  // Set Get Mocked Axios Request
  axiosMocked.get.mockResolvedValueOnce( { data: [ { name: 'Hyller Bandeira Dutra', id: '1' } ] } );

  const history = createMemoryHistory();

  const { container, getByText } = render(<App history={history}/>);

  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(getById(container, 'filter').placeholder).toMatch('Filter Contact');

  // Wait to contact item to continue testing
  const contactElement = await waitForElement(() => getByContactItem(container, 'true'));

  // Validate if newly created item is equal to api response
  expect(contactElement).toHaveTextContent('Hyller Bandeira Dutra');
});

// Test Contact creationg
test('Home page/Navigating to Create Page and Creating a new Contact', async () => {
  const history = createMemoryHistory();

  const { container, getByText, getByLabelText } = render(<App history={history} />);

  // Click on link to create page
  fireEvent.click(getByText('Cadastrar Contato'));
  
  // check that the content changed to the Show Page
  expect(container.innerHTML).toMatch('Cadastro de Contato');

  // Populate the form
  fireEvent.change(getByLabelText('name'), { target: { value: 'João' } });
  fireEvent.change(getByLabelText('email'), { target: { value: 'joao@gmail.com' } });
  fireEvent.change(getByLabelText('phone'), { target: { value: '(33) 13721-4656' } });
  fireEvent.change(getByLabelText('address'), { target: { value: 'TESTE TESTE TESTE' } });

  // Submit confirmation
  fireEvent.click(getById(container, 'submit-button'));

  // Await redirect to Home page
  const filterElement = await waitForElement(() => getById(container, 'filter'));

  // check that the content changed to the Home Page
  expect(container.innerHTML).toMatch('Cadastrar Contato');
});

// Test Contact Edit
test('Home page/Navigating to Show Page, Opening Edit Mode and Updationg Contact', async () => {
  // Set Get Mocked Axios Request
  axiosMocked.get.mockResolvedValueOnce( { data: [ { name: 'Hyller Bandeira Dutra', id: '1' } ] } );

  const history = createMemoryHistory();
  const { container, getByText, getByLabelText } = render(<App history={history}/>);

  const contactElement = await waitForElement(() => getByContactItem(container, 'true'));
  
  // Change get request return
  axiosMocked.get.mockResolvedValueOnce( { data: { name: 'Hyller Bandeira Dutra', id: '1' } } );

  await fireEvent.click(contactElement);
  
  const nameElement =  await waitForElement(() => getByValue(container, 'Hyller Bandeira Dutra'));
  
  await fireEvent.click(getByText('Editar Contato'));

  // check that the content changed to the Edit Page
  expect(container.innerHTML).toMatch('Salvar Contato');

  // Populate the form
  fireEvent.change(getByLabelText('name'), { target: { value: 'João' } });
  fireEvent.change(getByLabelText('email'), { target: { value: 'joao@gmail.com' } });
  fireEvent.change(getByLabelText('phone'), { target: { value: '(33) 13721-4656' } });
  fireEvent.change(getByLabelText('address'), { target: { value: 'TESTE TESTE TESTE' } });

  // Submit confirmation
  fireEvent.click(getById(container, 'submit-button'));

  // Await redirect to Home page
  const filterElement = await waitForElement(() => getById(container, 'filter'));

  // check that the content changed to the Home Page
  expect(container.innerHTML).toMatch('Cadastrar Contato');
});

// Test Contact Edit
test('Home page/Navigating to Show Page and Deleting the Contact', async () => {
  // Set Get Mocked Axios Request
  axiosMocked.get.mockResolvedValueOnce( { data: [ { name: 'Hyller Bandeira Dutra', id: '1' } ] } );

  const history = createMemoryHistory();
  const { container, getByText, getByLabelText } = render(<App history={history}/>);

  const contactElement = await waitForElement(() => getByContactItem(container, 'true'));
  
  // Change get request return
  axiosMocked.get.mockResolvedValueOnce( { data: { name: 'Hyller Bandeira Dutra', id: '1' } } );

  await fireEvent.click(contactElement);
  
  // Submit confirmation
  fireEvent.click(getById(container, 'delete-button'));

  // Await redirect to Home page
  const filterElement = await waitForElement(() => getById(container, 'filter'));

  // check that the content changed to the Home Page
  expect(container.innerHTML).toMatch('Cadastrar Contato');
});
