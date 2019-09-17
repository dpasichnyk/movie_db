import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { inject, observer } from "mobx-react";

@inject('errorStore')
@observer
export default class Error extends React.Component {

    render() {
        if (this.props.errorStore.errors.length === 0) return null;

        toast.error(this.props.errorStore.errors.join(` \n`), {
            onClose: () => this.props.errorStore.clear()
        });

        return (
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}