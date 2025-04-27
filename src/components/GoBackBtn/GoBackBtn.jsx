import { Link } from 'react-router-dom';
import css from './GoBackBtn.module.css';
const GoBackBtn = ({to}) => {
  return <Link to={to} className={css.link}>GoBackBtn</Link>;
};

export default GoBackBtn;
