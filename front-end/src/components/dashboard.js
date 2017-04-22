import  React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render(){
    return(
      <div>
        <h2>Dashboard</h2>
        {this.props.message}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.messanger.message };
}

export default connect(mapStateToProps, actions)(Dashboard);
