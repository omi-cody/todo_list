import {
  faCheck,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  addToDoApi,
  deleteToDoApi,
  getToDosApi,
  updateToDoApi,
} from '../../api/api';

const ToDo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [titleError, setTitleError] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getToDosApi();
      if (res.status === 200) {
        if (Array.isArray(res.data.toDos)) {
          setTodos(res.data.toDos);
        } else {
          console.error('Unexpected response structure:', res.data);
          toast.error('Failed to fetch tasks');
        }
      } else {
        console.error('Error fetching tasks:', res.statusText);
        toast.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleTitle = (e) => setTitle(e.target.value);

  const handleDescription = (e) => setDescription(e.target.value);

  const validate = () => {
    let isValid = true;
    setTitleError('');

    if (title.trim() === '') {
      setTitleError('Please enter a title.');
      isValid = false;
    }

    return isValid;
  };

  const handleAddOrEditToDo = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const data = { title, description };

    try {
      let res;
      if (editId) {
        res = await updateToDoApi(editId, data);
      } else {
        res = await addToDoApi(data);
      }
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        fetchTodos();
        setTitle('');
        setDescription('');
        setEditId(null);
      }
    } catch (error) {
      toast.error('Failed to add/update task');
      console.error(error);
    }
  };

  const handleDeleteToDo = async (id) => {
    try {
      const res = await deleteToDoApi(id);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchTodos();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to delete task');
      console.error(error);
    }
  };

  const handleEditToDo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id);
  };

  const handleStatusUpdate = async (id) => {
    try {
      const res = await updateToDoApi(id, { status: 'Completed' });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchTodos();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  return (
    <div className='container pt-5 mt-5'>
      <header
        id='main-header'
        className='bg-primary text-white p-3 mb-4 rounded shadow'>
        <div className='row'>
          <div className='col-md-12'>
            <h1
              id='header-title'
              className='d-flex justify-content-center align-items-center'>
              TO-DO List
              <FontAwesomeIcon
                icon={faPencil}
                className='ms-3'
              />
            </h1>
          </div>
        </div>
      </header>
      <form onSubmit={handleAddOrEditToDo}>
        <div className='card shadow'>
          <div className='card-header bg-secondary text-white'>
            <h5 className='mb-0'>{editId ? 'Edit Task' : 'Add a New Task'}</h5>
          </div>
          <div className='card-body'>
            <div className='mb-3'>
              <input
                type='text'
                className={`form-control ${titleError ? 'is-invalid' : ''}`}
                id='title'
                placeholder='Enter task title...'
                value={title}
                onChange={handleTitle}
              />
              <div className='invalid-feedback'>{titleError}</div>
            </div>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                id='description'
                placeholder='Enter task description...'
                value={description}
                onChange={handleDescription}
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary w-100'>
              <FontAwesomeIcon icon={faPlus} />{' '}
              {editId ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </form>
      <div className='mt-4'>
        <div className='list-group'>
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo._id}
                className='list-group-item list-group-item-action d-flex justify-content-between align-items-center shadow-sm mb-2'>
                <div>
                  <h5 className='mb-1'>{todo.title}</h5>
                  <p className='mb-1'>{todo.description}</p>
                </div>
                <div className='d-flex align-items-center'>
                  <span className='badge bg-info text-dark me-3'>
                    {todo.status}
                  </span>
                  <button
                    className='btn btn-success btn-sm me-2'
                    onClick={() => handleStatusUpdate(todo._id)}>
                    <FontAwesomeIcon icon={faCheck} /> Complete
                  </button>
                  <button
                    className='btn btn-primary btn-sm me-2'
                    onClick={() => handleEditToDo(todo)}>
                    <FontAwesomeIcon icon={faPencil} /> Edit
                  </button>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDeleteToDo(todo._id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-muted'>No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
