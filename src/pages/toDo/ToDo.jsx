import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const ToDo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const [titleError, setTitleError] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription.apply(e.target.value);
  };

  var validate = () => {
    var isValid = true;

    if (title.trim() == '') {
      setTitleError('Please Enter the title');
    }
  };
  const handleAddToDo = () => {
    if (title && description) {
      setTodos([...todos, { title, description }]);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className='container pt-5 mt-5'>
      <header
        id='main-header'
        className='bg-warning text-white p-4 mb-4'>
        <div className='row'>
          <div className='col-md-12'>
            <h1
              id='header-title'
              className='d-flex justify-content-between align-items-center'>
              ToDo List
              <FontAwesomeIcon
                icon={faPencil}
                className='float-end fs-3'
              />
            </h1>
          </div>
        </div>
      </header>
      <div className='card'>
        <div className='card-header'>
          <h5 className='mb-0'>Add a new task</h5>
        </div>
        <div className='card-body'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              id='inputTitle'
              placeholder='Enter item to do...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='text'
              className='form-control'
              id='inputDescription'
              placeholder='Enter description...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type='button'
              className='btn btn-primary'
              id='addToDo'
              onClick={handleAddToDo}>
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
    </div>
  );
};

export default ToDo;
