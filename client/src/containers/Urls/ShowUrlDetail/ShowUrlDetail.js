import React from "react";
import UrlContainer from "../../../components/Home/UrlContainer/UrlContainer";
import axios from "../../../axios";
import {URLS_ENDPOINT} from "../../../utils/endpoints";

class ShowUrlDetail extends React.Component {
    state = {
        url : null
    };
    componentDidMount() {
        axios.get(`${URLS_ENDPOINT}/${this.props.match.params['id']}`).then(resp => {
            const url = {...resp.data.url,shortened_url: window.location.origin + '/' + resp.data.url.shortened_url}
            this.setState({url: url });
        })
    }

    render() {
        return (
            <div>
                <div className="flex justify-center mt-10">
                    {this.state.url ? <UrlContainer src={this.state.url}/> : null}
                </div>
            </div>
        )
    }
}


export default ShowUrlDetail;