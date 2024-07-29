import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addToDoApi } from '../../api/api';

const ToDo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [titleError, setTitleError] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const validate = () => {
    let isValid = true;
    setTitleError('');

    if (title.trim() === '') {
      setTitleError('Please enter a title.');
      isValid = false;
    }

    return isValid;
  };

  const handleAddToDo = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const data = { title, description };

    addToDoApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // Add the new to-do to the local state
          setTodos([...todos, data]);
          // Clear the input fields
          setTitle('');
          setDescription('');
        }
      })
      .catch((error) => {
        toast.error('Failed to add task');
        console.error(error);
      });
  };

  return (
    <div className='container pt-5 mt-5'>
      <header
        id='main-header'
        className='bg-white text-balck p-1 mb-2 rounded'>
        <div className='row'>
          <div className='col-md-12'>
            <h1
              id='header-title'
              className='d-flex justify-content-center align-items-center'>
              TO-DO List
              <FontAwesomeIcon
                icon={faPencil}
                className='float-end fs-3 px-5'
              />
            </h1>
          </div>
        </div>
      </header>
      <form onSubmit={handleAddToDo}>
        <div className='card'>
          <div className='card-header'>
            <h5 className='mb-0'>Add a new task</h5>
          </div>
          <div className='card-body'>
            <div className='input-group mb-3'>
              <input
                type='text'
                className={`form-control ${titleError ? 'is-invalid' : ''}`}
                id='title'
                placeholder='Enter item to do...'
                value={title}
                onChange={handleTitle}
              />
              <div className='invalid-feedback'>{titleError}</div>
              <input
                type='text'
                className='form-control'
                id='description'
                placeholder='Enter description...'
                value={description}
                onChange={handleDescription}
              />
              <button
                type='submit'
                className='btn btn-primary'
                id='addToDo'>
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
            </div>
            <div className='list-group'>
              {todos.length > 0 ? (
                todos.map((todo, index) => (
                  <div
                    key={index}
                    className='list-group-item list-group-item-action'>
                    <h5 className='mb-1'>{todo.title}</h5>
                    <p className='mb-1'>{todo.description}</p>
                  </div>
                ))
              ) : (
                <p className='text-center text-muted'>No tasks added yet.</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ToDo;
