import styles from './CountryInfo.module.css';

const CountryInfo = ({ country }) => {
  const {
flag,
capital,
countryName,
languages = [],
population,
} = country;
  return (
    // <h2>CountryInfo</h2>
    <div className={styles.wrapper}>
      <div className={styles.flag}>
        <img className={styles.img} src={flag} alt={countryName} />
      </div>
      <div className={styles.box}>
        <h3 className={styles.capital}>
          Capital: <span className={styles.accent}>{capital}</span>
        </h3>

        <h1 className={styles.title}>
          {countryName === 'Russian Federation' ? 'MORDOR' : countryName}
        </h1>

        <p className={styles.details}>
          Population: <span className={styles.accent}>{population}</span>
        </p>

        <p className={styles.details}>
          Languages:
          {' '}
          {languages.map((lang, index) => { 
            return (
              <span key={index} className={styles.accent}>
                {lang}
                {index < languages.length - 1 && ', '}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default CountryInfo;
