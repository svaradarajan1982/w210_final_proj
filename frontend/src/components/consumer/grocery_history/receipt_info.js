import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import {api} from './../../../util/api';
import {setReceipt} from './../../../actions/receiptAction'
import {toastr} from 'react-redux-toastr'
import {BASE_URL} from '../../../constants/constants'
import { withRouter } from 'react-router-dom'
import Lightbox from 'react-image-lightbox';


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
    currentReceipt : state.receiptReducer.current_receipt
  };
};

const mapDispatchToProps =(dispatch) => {
  return {
      setReceiptItem :(receipt) => {
        dispatch(setReceipt(receipt));
      },
      updateReceiptInfo :(user_id,receipt_id, receipts, cb) => {
        api.updateWastageDataById(user_id, receipt_id, receipts).then(function(res){
          console.log(res);
          cb()
          toastr.success('Updated Receipt Id:', receipt_id);
        })
      }
    }
};

class ReceiptInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    };
  }

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  handleOnWastageAmountEdit = (idx, item,e,val) => {
    // this.props.setReceiptItem(item);
    console.log(val, idx,item)
    let receipt = this.props.currentReceipt;
    let res = receipt.receipt.slice();
    let waste = receipt.wastage.slice();
    waste[idx]['wastage'] = val
    this.props.setReceiptItem({receipt: res, wastage: waste})
  }
  handleOnWastageUnitEdit = (idx, item,e,val) => {
    // this.props.setReceiptItem(item);
    console.log(val, idx,item)
    let receipt = this.props.currentReceipt;
    let res = receipt.receipt.slice();
    let waste = receipt.wastage.slice();
    waste[idx]['wastage_unit'] = val
    this.props.setReceiptItem({receipt: res, wastage: waste})
  }
  handleOnReceiptRemove = (event, item) => {
    console.log('remove data...', item)
  }

  onSubmit() {
    // console.log(this.props.currentReceipt)
    let receipt_id = this.props.currentReceipt['receipt'][0]['receipt_id'];
    let wastage = this.props.currentReceipt['wastage']
    this.props.updateReceiptInfo(this.props.username,
      receipt_id, wastage,() => {
      console.log('finished...')
      this.props.history.push('/consumer')
    })
  }

  componentDidMount() {
    // if(this.props.currentReceipt && this.props.currentReceipt.receipt
    // && this.props.currentReceipt.receipt.length == 0) {
    //   this.props.history.push('/consumer')
    // }
    this.setState({receipt: this.props.currentReceipt})
  }

  renderReceiptImg() {
    if(this.props.currentReceipt && this.props.currentReceipt.receipt
    && this.props.currentReceipt.receipt.length > 0) {
      console.log(url);
      let receipt_id = this.props.currentReceipt.receipt[0]['receipt_id']
      let path = this.props.username + '_' + receipt_id;
      let url =`${BASE_URL}/receipt_image/${path}`;
      // <img style={{width: '200px', height:'200px'}} src= {url} />
      return <div  style={{display: 'inline-block', textAlign: 'right', width: '30%', position: 'absolute'}}>
        <img className='clickable' onClick={()=>{this.setState({isOpen: true})}} style={{width: '120px'}} src= {url} />
        {this.state.isOpen && (<Lightbox
            mainSrc={url}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />)
        }
      </div>
    }
    return <div></div>
  }

  render() {
    if(!this.props.currentReceipt || !this.props.currentReceipt.wastage){
      return <span>Loading...</span>
    }
    let items = []
    for(var i =0; i< this.props.currentReceipt.wastage.length; i ++) {
      let receipt = this.props.currentReceipt.receipt[i];
      let wastage = this.props.currentReceipt.wastage[i];
      let el = (
        <TableRow key={i}>
          <TableRowColumn>{receipt['name']}</TableRowColumn>
          <TableRowColumn>{receipt['quantity']}</TableRowColumn>
          <TableRowColumn>{receipt['unit']}</TableRowColumn>
          <TableRowColumn>{receipt['price']}</TableRowColumn>
          <TableRowColumn>{receipt['category']}</TableRowColumn>
          <TableRowColumn>
            <TextField onChange={this.handleOnWastageAmountEdit.bind(this,i,wastage)} value={wastage.wastage}/>
          </TableRowColumn>
          <TableRowColumn>
            <TextField onChange={this.handleOnWastageUnitEdit.bind(this,i,wastage)} value={wastage.waste_unit}/>
          </TableRowColumn>
      </TableRow>
      )
      //
      items.push(el)
    }
    return (
      <div>
        <h1> Grocery Info</h1>

        <div style={{height: 200, textAlign: 'left', position: 'relative'}}>
          {this.renderReceiptImg()}
          <div style={{position: 'absolute', right:'30%',display: 'inline-block',width: '35%', marginLeft: '20px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate cursus scelerisque. Phasellus at laoreet mi. Morbi non nibh facilisis, viverra dui luctus, vestibulum metus. Aliquam suscipit mauris dui, quis hendrerit tellus sagittis ut. Nam leo mi, dignissim sit amet dapibus eget, pharetra at neque. Integer ut facilisis purus. Aliquam erat volutpat.
          </div>
        </div>

        <br />
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable = {false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
            >
            <TableRow>
              <TableHeaderColumn colSpan="6" style={{textAlign: 'left'}}>
                Grocery Info
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
            <TableHeaderColumn tooltip="item">Food Name</TableHeaderColumn>
            <TableHeaderColumn tooltip="quantity">Quantity</TableHeaderColumn>
            <TableHeaderColumn tooltip="unit">Unit</TableHeaderColumn>
            <TableHeaderColumn tooltip="price">Price($)</TableHeaderColumn>
            <TableHeaderColumn tooltip="category">Category</TableHeaderColumn>
            <TableHeaderColumn tooltip="wastage_info">Wastage Amount</TableHeaderColumn>
            <TableHeaderColumn tooltip="wastage_unit">Wastage Unit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {items && items.map((row) =>
              (row))
            }
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
        <div>
          <Link to='/consumer'>Back</Link>
          <RaisedButton onClick={this.onSubmit.bind(this)} style={{marginLeft: '20px'}} label = 'Save' primary={true}/>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReceiptInfo))
