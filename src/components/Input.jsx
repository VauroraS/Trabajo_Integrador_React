
import PropTypes from 'prop-types';

function Input({ onAddTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const todoForm = new FormData(e.target);
    const description = todoForm.get('description');
    onAddTask(description);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">Nueva tarea: </label>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Comprar..."
        required
      />
      <button type="submit">Crear</button>
    </form>
  );
}

Input.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default Input;
