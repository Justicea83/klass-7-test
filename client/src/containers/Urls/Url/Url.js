import React from "react";
import axios from "../../../axios";
import {URLS_ENDPOINT} from "../../../utils/endpoints";

class Url extends React.Component {
    componentDidMount() {
        axios.get(`${URLS_ENDPOINT}/${this.props.match.params['id']}`).then(resp => {
            //window.location.href = resp.data.url.original_url
            //window.location.origin =
            window.open(resp.data.url.original_url,"_self")
        })
    }

    render() {
        return (
            <div/>
        )
    }
}

export default Url;