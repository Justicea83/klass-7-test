import React from "react";
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types'

const urlContainer = (props) => {
    return (
        <div className="w-1/2">
            <ReactJson src={props.src} theme="monokai"/>
        </div>
    )
};
urlContainer.propTypes = {
    src : PropTypes.object.isRequired
};
export default urlContainer