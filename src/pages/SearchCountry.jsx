import Container from '../components/Container/Container';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from '../../src/service/countryApi';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isMounted = useRef(false);

  useEffect(() => { 
    if (!isMounted.current) {
      isMounted.current = true;
      const queryFromParams = searchParams.get('region') ?? '';
      if (queryFromParams !== '') {
        onSubmit(queryFromParams);
      }
    }
  }, []);

  useEffect(() => { 
    const region = searchParams.get('region') ?? '';
    if (region === '') { 
      return;
    }
    setIsLoading(true);
    setError('');
    fetchByRegion(region).then((response) => {
        setCountries(response);
      }).catch(() => {
        setError('Error fetching data. Please try again later.');
      }).finally(() => { 
        setIsLoading(false);
      })
  }, [searchParams]);

  const onSubmit = (region) => { 
    setSearchParams({ region });
  }
  const isShowError = error !== '';
  const isShowCountries = countries.length > 0;
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {isShowCountries && (<CountryList countries={countries} />)}
        {isLoading && <Loader />}
        {isShowError && <p>{error}</p>}
      </Container>
    </Section>
  );
};

export default SearchCountry;
