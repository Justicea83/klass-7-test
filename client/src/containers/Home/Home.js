import React, {Component} from "react";
import Logo from '../../logo.svg';
import {validateUrl} from "../../utils/validations";
import axios from "../../axios";
import {URLS_ENDPOINT} from "../../utils/endpoints";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import {toastr} from 'react-redux-toastr';
import UrlContainer from "../../components/Home/UrlContainer/UrlContainer";


class Home extends Component {
    textAreaClasses = 'py-2 px-3 block w-full appearance-none border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5';
    state = {
        form: {
            url: {
                placeholder: 'Your Name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            valid: false
        },
        textAreaClasses: [
            this.textAreaClasses
        ],
        url: null
    };

    handleUrlChanged = (event, url) => {
        const validity = validateUrl(event.target.value);
        if (!validity) {
            this.setState({textAreaClasses: [this.textAreaClasses, 'border-red-500']})
        } else {
            this.setState({textAreaClasses: [this.textAreaClasses, 'border-gray-300']})
        }
        const updatedControls = {
            ...this.state.form,
            [url]: {
                ...this.state.form[url],
                value: event.target.value,
                valid: validity,
                touched: true
            },
            valid: validity
        };
        this.setState({form: updatedControls})
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.form.valid) {
            axios.post(URLS_ENDPOINT, {original_url: this.state.form.url.value}).then(resp => {
                console.log(resp.data);
                if (resp.status === 201) {
                    //console.log(resp.data)
                    console.log(JSON.stringify(resp.data.url));
                    console.log(resp.data.url.toString());
                    this.setState({url: resp.data.url});
                    toastr.success('Created!', 'Url Added Successfully')
                }
            }).catch(error => {
                console.log(error.response);
                toastr.success('The title', 'The message')
            })
        }
    };


    render() {
        return (
            <div>
                <div className="min-h-screen bg-gray-50 flex flex-col mt-10 py-12 sm:px-6 lg:px-8">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:w-full md:max-w-lg">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form method="POST" onSubmit={this.handleFormSubmit}>
                                <div>
                                    <label htmlFor="url"
                                           className="block text-sm font-medium leading-5 text-gray-700">
                                        Url To Shorten
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <textarea id="url" rows="3"
                                                  required={this.state.form.url.validation.required}
                                                  placeholder={this.state.form.url.placeholder}
                                                  value={this.state.form.url.value}
                                                  onChange={(event) => this.handleUrlChanged(event, 'url')}
                                                  className={this.state.textAreaClasses.join(' ')}/>
                                        {!this.state.form.url.valid && this.state.form.url.touched ?
                                            <p className="text-red-500 text-xs italic">Please enter a valid
                                                url.</p> : null}
                                    </div>
                                </div>

                                <div className="mt-6">
                                      <span className="block w-full rounded-md shadow-sm">
                                        <button type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                          Shorten Url
                                        </button>
                                      </span>
                                </div>
                            </form>

                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        {this.state.url ? <UrlContainer src={this.state.url}/> : null}
                    </div>
                </div>


            </div>
        );
    }
}

export default Home