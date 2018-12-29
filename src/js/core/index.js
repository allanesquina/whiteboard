import Types from '../components/';

const uiComponents = new Map();

function lookingForComponents(element) {
  const components = element.querySelectorAll("[data-component]");
  components.forEach(el => {
    const componentType = el.getAttribute("data-component");
    if (Types[componentType]) {
      const uiComponent = new Types[componentType](el);
      lookingForComponents(uiComponent.DOM);
      uiComponents.set(uiComponent.name, uiComponent);
    }
  });
}

export default function bootstrap(element) {
  lookingForComponents(element);
}

