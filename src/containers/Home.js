/**
 * @namespace Container
 */
import React, { Component } from 'react';

import 'assets/scss/home.scss';

/**
 * 首页页面组件
 *
 * @export
 * @class Home
 * @extends {Component}
 * @memberOf Container
 */
export default class Home extends Component {
  render() {
    return (
      <div className="sprites-box">
          <p>雪碧图使用</p>
          <i className="icon icon-empty-code"></i>
          <i className="icon icon-empty-fund"></i>
          <i className="icon icon-empty-msg"></i>
          <i className="icon icon-empty-nonecoupon"></i>
          <i className="icon icon-empty-record"></i>
      </div>
    );
  }
}
