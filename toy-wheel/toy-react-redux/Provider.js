import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Provider extends Component {
  static childContextTypes = {
    store: PropTypes.object.isRequired
  }
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return this.props.children
  }
}