import React from 'react';
import RenderIf from 'render-if';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function LoadingButton(props) {
    return (
        <Button type={props.type} disabled={props.loading}>
            {RenderIf(props.loading)(<FontAwesomeIcon icon={props.icon} pulse />)}
            {(props.loading) ? ` ${props.text}` : props.children}
        </Button>
    );
}

LoadingButton.defaultProps = {
    type: "button",
    loading: false,
    text: "Loading . . .",
    icon: faSpinner
};

LoadingButton.propTypes = {
    type: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    text: PropTypes.string,
    icon: PropTypes.object
};

export default LoadingButton;