import { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://shoes.faruk.ink/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data.todos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-xl" style={{ color: '#000000' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-xl" style={{ color: '#000000' }}>{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl px-4">
      <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#000000' }}>Todo List</h1>
      <div className="grid gap-6">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="rounded-lg p-6 transition-all duration-300 hover:transform hover:scale-[1.02]"
            style={{
              backgroundColor: '#EAE4D5',
              border: '2px solid #B6B09F',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>
                  {todo.title}
                </h2>
                <p className="mb-4" style={{ color: '#000000' }}>
                  {todo.description}
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: todo.completed ? '#B6B09F' : '#F2F2F2',
                  color: '#000000',
                  border: '1px solid #B6B09F'
                }}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo; 