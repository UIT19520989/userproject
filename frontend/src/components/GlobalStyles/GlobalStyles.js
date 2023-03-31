import PropTypes from 'prop-types';
import './GlobalStyles.scss';
import '../../assets/styles/responsive.css';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
