import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import {api} from './../../../util/api';
import { cyan500 } from 'material-ui/styles/colors';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
// import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui-slider-label/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};


const mapStateToProps = function(state){
  return {
    username: state.loginReducer.username
  };
};

const mapDispatchToProps =(dispatch) => {
  return {

      getRecommendations : (username) => {
        api.getGroceryListRecommendations(username).then(function(res) {
          dispatch(setRecommendedGroceryList(res['data']))
        })
      },
      getItemSuggestion : (username) => {
        api.getGroceryItemSuggestions(username).then(function(res) {
          // dispatch(setSuggestedItemsList(res['data']))
        })
      }
    }
};


class Analytics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    selection : 0,
    wasteThreshold: 50,
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '250px'
    };
  }
  handleChange = (e, val) => {
    this.setState({selection: val})
  }
    componentDidMount() {
      // var divElement = document.getElementById('viz1517880550497');
      // var vizElement = divElement.getElementsByTagName('object')[0];
      // vizElement.style.width='1200px';vizElement.style.height='827px';
      // var scriptElement = document.createElement('script');
      // scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      // vizElement.parentNode.insertBefore(scriptElement, vizElement);
    }

    render() {
      // <iframe src='https://public.tableau.com/shared/7MGG6C86Z?:display_count=yes:embed=y' width='600px' height='400px'></iframe>
      // <span dangerouslySetInnerHTML={template}></span>
      let iframe_st = {
        // "position": "fixed",
        // "top": "40px",
        // "left": "0px",
        // "bottom": "40px",
        // "right": "0px",
        // "width": "100%",
        // "height": "100%",
        "border": "none",
        // "margin": "0",
        // "padding": "0",
        // "overflow": "scroll",
        // "z-index": "999999"
      }
      // <iframe src="http://people.ischool.berkeley.edu/~varadarajan/informational-analytics/" style={iframe_st}></iframe>
      if (!this.props.username) {
        return <span>hold on...</span>
      }
      let options = [
        'bar-chart',
        'bubble_chart-gh-pages',
        'stacked-area-chart'
      ]
      let url = "http://50.97.219.169:8065/"+options[this.state.selection]+"/index.php?user_id=" + this.props.username;
      return (
        <div>
          <SelectField
          floatingLabelText="Select Chart"
          value={this.state.selection}
          onChange={this.handleChange.bind(this)}
          >
            <MenuItem value={0} primaryText={options[0]} />
            <MenuItem value={1} primaryText={options[1]} />
            <MenuItem value={2} primaryText={options[2]} />
        </SelectField>
          <br />
          <iframe src={url} width='100%' height='700px' style={iframe_st}></iframe>

          <br />
          <br />
          <br />
        </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)