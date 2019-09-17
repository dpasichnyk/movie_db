import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className='nav navbar-nav pull-xs-right'>
                <li className='nav-item'>
                    <Link to='/' className='nav-link'>
                        Home
                    </Link>
                </li>

                <li className='nav-item'>
                    <Link to='/login' className='nav-link'>
                        Sign in
                    </Link>
                </li>

                <li className='nav-item'>
                    <Link to='/register' className='nav-link'>
                        Sign up
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className='nav navbar-nav pull-xs-right'>
                <li className='nav-item'>
                    <Link to='/' className='nav-link'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/profile' className='nav-link'>
                        Profile
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='#' className='nav-link' onClick={props.onClickLogout}>
                        Log out
                    </Link>
                </li>
            </ul>
        );
    }

    return null;
};

@inject('authStore', 'commonStore', 'userStore')
@withRouter
@observer
class Header extends React.Component {
    handleClickLogout = () => {
        this.props.authStore.logout()
            .then(() => this.props.history.replace('/'));
    };

    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark static-top'>
                <div className='container'>
                    <Link to='/' className='navbar-brand'>
                        {this.props.commonStore.appName.toUpperCase()}
                    </Link>

                    <LoggedOutView currentUser={this.props.userStore.currentUser} />
                    <LoggedInView
                        currentUser={this.props.userStore.currentUser}
                        onClickLogout={this.handleClickLogout}
                    />
                </div>
            </nav>
        );
    }
}

export default Header;