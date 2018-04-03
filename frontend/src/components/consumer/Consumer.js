import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReceiptHistory from './grocery_history/receipt_history';
import  GroceryListRecommender from './grocery_list/grocery_list_recommender';
import ReceiptUploader from './receipt_uploader/receipt_uploader';
import Analytics from './Analytics/analytics';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom'

import {
  team500, team700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
const st = {
  backgroundColor : '#FAFAFA',
  // color: 'black',
  textAlign: 'right',
  margin: '0 auto',
  padding: '15px 0'
}

const mapStateToProps = function(state){
  return {
    username : state.loginReducer.username,
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    returnToLogin: () => {
      dispatch(push('/login'));
    }
  }
}

class Consumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val : 'b'
    }
  }

  componentDidMount() {
    if(!this.props.username) {
      this.props.history.push('/login')
      return;
    }
  }
  onTabChange(tabVal) {
    console.log(tabVal)
    this.setState({val : tabVal})
  }

  getTabs() {
    return (
    <Tabs value={this.state.val}
      onChange={this.onTabChange.bind(this)}>
     <Tab label="Receipt History" value="b">
       {this.state.val ==  'b' && <ReceiptHistory />}

     </Tab>
     <Tab label="Grocery Recommender" value="c">
       {this.state.val == 'c' && <GroceryListRecommender />}
     </Tab>
     <Tab label="Receipt Uploader" value="a">
       {this.state.val == 'a'
         && <ReceiptUploader onTabChange={this.onTabChange.bind(this)}/>}
      </Tab>

     <Tab label="Analytics" value="d">
       {this.state.val == 'd' && <Analytics />}
      </Tab>
  </Tabs>)
  }
  render() {
    return (
      <div>
        {this.getTabs()}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Consumer))
