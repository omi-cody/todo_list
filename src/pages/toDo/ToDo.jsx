import {
  faCheck,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
  addToDoApi,
  deleteToDoApi,
  getToDosApi,
  updateStatusApi,
  updateToDoApi,
} from '../../api/api';

const ToDo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDueDate] = useState('');
  const [todos, setTodos] = useState([]);
  const [titleError, setTitleError] = useState('');
  const [editId, setEditId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    fetchTodos();

    // Set up polling
    const id = setInterval(fetchTodos, 1000); // Fetch every 5 seconds
    setIntervalId(id);

    return () => clearInterval(id); // Cleanup on component unmount
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

  const handleDueDate = (e) => setDueDate(e.target.value);

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

    const data = { title, description, date };

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
        setDueDate('');
        setEditId(null);
      }
    } catch (error) {
      toast.error('Failed to add/update task');
      console.error(error);
    }
  };

  const handleEditToDo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.date ? todo.date.split('T')[0] : ''); // Set date in YYYY-MM-DD format
    setEditId(todo._id);
  };

  const handleStatusUpdate = async (id, status) => {
    const newStatus = status === 'Completed' ? 'Pending' : 'Completed';

    try {
      const res = await updateStatusApi(id, { status: newStatus });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to update status');
      console.error('Status update error:', error);
    }
  };

  const handleDeleteToDo = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: 'btn btn-primary w-xs me-2 mt-2',
        cancelButton: 'btn btn-danger w-xs mt-2',
      },
      buttonsStyling: false,
      showCloseButton: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteToDoApi(id);
        console.log('Delete response:', res);

        if (res.data.success) {
          toast.success(res.data.message);
          fetchTodos();
        } else {
          toast.error(res.data.message || 'Failed to delete task');
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete task');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Your task is safe :)',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary mt-2',
        },
        buttonsStyling: false,
      });
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
              TODO Task
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
            <div className='mb-3'>
              <input
                type='date'
                className='form-control'
                id='date'
                placeholder='Select date...'
                value={date}
                onChange={handleDueDate}
              />
            </div>
            <div className='text-end'>
              <button
                type='submit'
                className='btn btn-primary'>
                <FontAwesomeIcon icon={faPlus} />{' '}
                {editId ? 'Update Task' : 'Add Task'}
              </button>
            </div>
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
                  <div className='d-flex align-items-center'>
                    <label
                      htmlFor={`todo-${todo._id}`}
                      className={todo.status === 'Completed' ? 'text-decoration-line-through' : ''}>
                      <h5 className='mb-1'>{todo.title}</h5>
                      <p className='mb-1'>{todo.description}</p>
                      {todo.date && <small className='text-muted'>Due: {new Date(todo.date).toLocaleDateString()}</small>}
                    </label>
                  </div>
                </div>
                <div className='d-flex align-items-center'>
                  <span className='badge bg-info text-dark me-3'>
                    {todo.status}
                  </span>
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
                  <input
                    type='checkbox'
                    id={`todo-${todo._id}`}
                    checked={todo.status ==='Completed'}
                    onChange={() => handleStatusUpdate(todo._id, todo.status)}
                    className='form-check-input  me-2 ms-4'
                  />
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-danger'>No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
