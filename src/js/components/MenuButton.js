import { Component } from '../core/Component';

export default class MenuButton extends Component {
  render() {
    const { type } = this.props;
    return `
            <div 
                class="ui-pencilbtn item icon icon-${type}"
            ></div>
        `;
  }
}
