import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('commonStore')
@observer
class Header extends React.Component {
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark static-top'>
                <div className='container'>
                    <Link to='/' className='navbar-brand'>
                        {this.props.commonStore.appName.toUpperCase()}
                    </Link>
                </div>
            </nav>
        );
    }
}

export default Header;