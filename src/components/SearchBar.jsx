
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';

function Search({ onSearch }) {
  return (
    <form>
      <div className="search-container">
        <IoSearch className="search-icon" size={20} />
        <input
          type="search"
          name="search"
          id="search"
          aria-label="Escriba su búsqueda"
          placeholder="Buscar..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
