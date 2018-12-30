import Types from '../components/';
import { store } from './store';

function lookingForComponents(element) {
  const components = element.querySelectorAll("[data-component]");
  components.forEach(el => {
    const componentType = el.getAttribute("data-component");
    if (Types[componentType]) {
      const uiComponent = new Types[componentType](el);
      uiComponent._init();
      lookingForComponents(uiComponent.DOM);
    }
  });
}

export function start(element) {
 lookingForComponents(element);
 store.setState({});
}

export default function bootstrap(element) {
  lookingForComponents(element);
}

