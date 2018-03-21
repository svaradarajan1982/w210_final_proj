import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {logoutUser} from '../../actions/loginAction'

const st = {
  backgroundColor : 'black',
  color: 'black',
  textAlign: 'right',
  margin: '0 auto',
  padding: '15px 0'
}

const mapStateToProps = function(state){
  return {
    loggedIn : state.loginReducer.loggedIn,
    username : state.loginReducer.username
  };
};


const mapDispatchToProps =(dispatch) => {
  return {
    logoutUser : () => {
        dispatch(logoutUser());
      //
    }
  };
};

class HeaderBar extends React.Component {
  render() {
    // <FlatButton primary={true} label="Consumer App" />
    // <FlatButton primary={true} label="Retailer App" />
    // <Link style={linkStyle} to='/retailer'>Retailer Waste Reduction Solutions</Link>
    // <span style={{'paddingRight':'20px'}}></span>

    const linkStyle = {
      color: 'white',
      textDecoration: 'none'
    }
    var el = <span></span>
    if(this.props.loggedIn) {
      el = (<span>
              <Link style={linkStyle} to='/consumer'>Consumer Waste Reduction Solutions </Link>
              <span style={{'paddingRight':'20px'}}></span>
              <Link style={linkStyle} to='/userinfo'>Info</Link>
              <span style={{'paddingRight':'20px'}}></span>
              <Link style={linkStyle} to='/login' onClick={this.props.logoutUser}>Logout</Link>
              <span style={{'paddingRight':'20px'}}></span>
        </span>)
    } else {
      //
      el = (<span>
        <Link style={linkStyle} to='/login'>Login</Link>
        </span>)
    }
    return (
      <header style = {st}>
        <span>
         <Link style={linkStyle} to='/wastage'>Visualizing Food Waste </Link>
         <span style={{'paddingRight':'20px'}}></span>
         {el}
         <span style={{'paddingRight':'20px'}}></span>
          <Link style={linkStyle} to='/faq'>About Us</Link>
          <span style={{'paddingRight':'20px'}}></span>

        </span>

      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
