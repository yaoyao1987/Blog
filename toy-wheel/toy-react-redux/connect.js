import React, { Component } from 'react';
import { bindActionCreators } from '../toy-redux';
import propTypes from 'prop-types';
export default function (mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    class ProxyComponent extends Component {
      static contextType = {
        store: propTypes.object
      }
      constructor(props, context) {
        super(props, context)
        this.store = context.store;
        this.state = mapStateToProps(this.store.getState());
      }
      componentWillMount() {
        this.store.subscribe(() => {
          this.setState(mapStateToProps(this.store.getState()))
        })
      }
      render() {
        let actions = {};
        if (typeof mapDispatchToProps == 'function') {
          actions = mapDispatchToProps(this.store.dispatch);
        } else if (typeof mapDispatchToProps == 'object') {
          actions = bindActionCreators(mapDispatchToProps, this.store.dispatch)
        }
        return <WrappedComponent {...this.state} {...actions} />
      }
    }
  }
}