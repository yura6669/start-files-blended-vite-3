import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchCountry } from '../../src/service/countryApi';
import Loader from '../components/Loader/Loader';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import CountryInfo from '../components/CountryInfo/CountryInfo';

const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useRef(false);

  useEffect(() => { 
    if (!isMounted.current) {
      isMounted.current = true;
      setIsLoading(true);
      setError('');
      fetchCountry(countryId)
        .then((response) => {
          setCountry(response);
        })
        .catch(() => {
          setError('Error fetching data. Please try again later.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const location = useLocation();
  const to = location.state ?? '/country';
  const isShowError = error !== '';
  const isShowCountry = country !== null;
  return (
    <Section>
      <Container>
        <GoBackBtn to={to} />
        {isShowCountry && (<CountryInfo country={country} />)}
        {isLoading && <Loader />}
        {isShowError && <p>{error}</p>}
      </Container>
    </Section>
  );
};

export default Country;
