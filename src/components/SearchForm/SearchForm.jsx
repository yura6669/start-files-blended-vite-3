import { FiSearch } from 'react-icons/fi';
import styles from './SearchForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const regions = [
  { id: 'africa', value: 'africa', name: 'Africa' },
  { id: 'america', value: 'america', name: 'America' },
  { id: 'asia', value: 'asia', name: 'Asia' },
  { id: 'europe', value: 'europe', name: 'Europe' },
  { id: 'oceania', value: 'oceania', name: 'Oceania' },
];

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => { 
    e.preventDefault();
    const form = e.target;
    const region = form.elements.region.value;
    if (region === 'default') { 
      toast.error('Please select a region');
      return;
    }
    onSubmit(region);
    form.reset();
  }
  return <>
  <form className={styles.form} onSubmit={handleSubmit}>
  <button className={styles.button} type="submit">
    <FiSearch size="16px" />
  </button>

  <select
    aria-label="select"
    className={styles.select}
    name="region"
    required
    defaultValue="default"
  >
    <option disabled value="default">
      Select a region
    </option>
      {regions.map((region) => { 
        return <option key={region.id} value={region.value}>
          {region.name}
        </option>
      })}
  </select>
    </form>
    <Toaster position='top-right' toastOptions={{
        style: {
          background: 'red',
          color: 'white',
        },
      }}/>
    </>
};

export default SearchForm;
