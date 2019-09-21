import React from 'react';

class ErrorsList extends React.Component {
    render() {
        const errors = this.props.errors;

        if (errors) {
            return (
                Object.keys(errors).map(key => {
                    return (
                        <div key={key} className='alert alert-danger' role='alert'>
                            {errors[key]}
                        </div>
                    );
                })

            );
        } else {
            return null;
        }
    }
}

export default ErrorsList;
