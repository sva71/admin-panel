import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.sass';

const Button = ({type, children, ...otherProps}) => {
    return (
        <button
            className={`${styles.button} ${type ? styles[`button--${type}`] : ''}`}
            {...otherProps}>
            {children}
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
}

Button.defaultProps = {
    type: ''
}

export default Button;