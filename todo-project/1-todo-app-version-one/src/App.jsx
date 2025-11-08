import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, InputGroup, FormControl, ListGroup, ButtonGroup } from 'react-bootstrap';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [addedItems, setAddedItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [view, setView] = useState('active'); // 'active' | 'added' | 'deleted'

  // ➕ Add new task
  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      date: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
    setAddedItems([...addedItems, newTask]);
    setInput('');
  };

  // 🗑️ Move task from Active → Deleted
  const handleDelete = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete) {
      const deletedTask = { ...taskToDelete, deletedAt: new Date().toLocaleString() };
      setDeletedItems([...deletedItems, deletedTask]);
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // ❌ Permanently remove from Deleted Items
  const handlePermanentDelete = (id) => {
    setDeletedItems(deletedItems.filter(item => item.id !== id));
  };

  // 👀 Decide which list to show based on selected view
  const renderList = () => {
    if (view === 'active') {
      return (
        <>
          {tasks.length === 0 && <ListGroup.Item>No active tasks</ListGroup.Item>}
          {tasks.map(task => (
            <ListGroup.Item
              key={task.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{task.text}</strong>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                  Added on: {task.date}
                </div>
              </div>
              <Button variant="outline-danger" size="sm" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </>
      );
    }

    if (view === 'added') {
      return (
        <>
          {addedItems.length === 0 && <ListGroup.Item>No items added yet</ListGroup.Item>}
          {addedItems.map(item => (
            <ListGroup.Item key={item.id}>
              <strong>{item.text}</strong>
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                Added on: {item.date}
              </div>
            </ListGroup.Item>
          ))}
        </>
      );
    }

    if (view === 'deleted') {
      return (
        <>
          {deletedItems.length === 0 && <ListGroup.Item>No items deleted yet</ListGroup.Item>}
          {deletedItems.map(item => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.text}</strong>
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                  Deleted on: {item.deletedAt}
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handlePermanentDelete(item.id)}
              >
                Delete Forever
              </Button>
            </ListGroup.Item>
          ))}
        </>
      );
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="p-4 rounded shadow-lg" style={{ backgroundColor: 'white' }}>
          <h2 className="text-center mb-4 text-primary fw-bold">📝 My Todo List</h2>

          {/* Input section */}
          <form onSubmit={handleAdd}>
            <InputGroup className="mb-3">
              <FormControl
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="✏️ Add a new task..."
                style={{ borderRadius: '10px 0 0 10px' }}
              />
              <Button type="submit" variant="primary" style={{ borderRadius: '0 10px 10px 0' }}>
                Add
              </Button>
            </InputGroup>
          </form>

          {/* Tabs to switch views */}
          <ButtonGroup className="mb-3 w-100">
            <Button
              variant={view === 'active' ? 'primary' : 'outline-primary'}
              onClick={() => setView('active')}
            >
              Active Tasks
            </Button>
            <Button
              variant={view === 'added' ? 'warning' : 'outline-warning'}
              onClick={() => setView('added')}
            >
              Added Items
            </Button>
            <Button
              variant={view === 'deleted' ? 'danger' : 'outline-danger'}
              onClick={() => setView('deleted')}
            >
              Deleted Items
            </Button>
          </ButtonGroup>

          {/* List Section */}
          <ListGroup style={{ borderRadius: '10px' }}>
            {renderList()}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoApp;
