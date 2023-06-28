import PropTypes from 'prop-types';
import css from 'components/Filter/Filter.module.css';

export const Filter = ({ onChange }) => {
  const handleInputChange = evt => {
    const { value } = evt.target;
    onChange(value);
  };

  return (
    <label className={css.filterLabel}>
      Find contacts by name
      <input type="text" onChange={handleInputChange} />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
