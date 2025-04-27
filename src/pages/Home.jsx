import Container from '../components/Container/Container';
import CountryList from '../components/CountryList/CountryList';
import Section from '../components/Section/Section';
import Loader from '../components/Loader/Loader';

import { useEffect, useState, useRef } from 'react';
import { getCountries } from '../../src/service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isMounted = useRef(false);

  useEffect(() => { 
    if (!isMounted.current) {
      isMounted.current = true;
      setIsLoading(true);
      setError('');
      getCountries().then((response) => {
        setCountries(response);
      }).catch(() => {
        setError('Error fetching data. Please try again later.');
      }).finally(() => { 
        setIsLoading(false);
      })
    }
  }, []);

  const isShowError = error !== '';
  const isShowCountries = countries.length > 0;

  return (
    <Section>
      <Container>
        {isShowCountries && (<CountryList countries={countries} />)}
        {isLoading && <Loader />}
        {isShowError && <p>{error}</p>}
      </Container>
    </Section>
  );
};
export default Home;
