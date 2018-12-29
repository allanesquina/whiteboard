import { Component } from '../core/Component';

export default class Screen extends Component {
  render() {
    return `
        <div>
          <div data-component="Menu"></div>
          <div data-component="Canvas"></div>
        </div>
    `;
  }
}