import React from "react";
import Url from "../../components/Urls/Url/Url";
import axios from "../../axios";
import {URLS_ENDPOINT} from "../../utils/endpoints";

class Urls extends React.Component{
    state = {
        urls : []
    };

    componentDidMount() {
        axios.get(URLS_ENDPOINT).then(resp => {
            this.setState({urls : resp.data.urls})
        })
    }

    render() {
        const urls = this.state.urls.map(url => {
            return <Url key={url.id} shortened_url={url.shortened_url} original_url={url.original_url} id={url.id}/>
        });
        return (
            <div className="container mx-auto mt-10">
                <div className="flex flex-col">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-10">
                        <div
                            className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Id
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider w-1/3">
                                        Shortened Url
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                {urls}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Urls;

