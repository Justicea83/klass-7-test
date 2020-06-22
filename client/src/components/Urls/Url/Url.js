import React from "react";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

const url = props => {
    const location =  window.location.origin;
    console.log(location)

    return (
    <tr className="bg-white">

        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
            {props.id}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
            <NavLink className="text-indigo-600 hover:text-indigo-900 text-right" to={'/urls/'+ props.shortened_url}>
                {`${location}/${props.shortened_url}`}
            </NavLink>
        </td>
    </tr>
)
};
url.propTypes = {
  shortened_url: PropTypes.string.isRequired,
  original_url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default url;

