export const str2DOMElement = (html) => {
  var frame = document.createElement("iframe");
  frame.style.display = "none";
  document.body.appendChild(frame);
  frame.contentDocument.open();
  frame.contentDocument.write(html);
  frame.contentDocument.close();
  var el = frame.contentDocument.body.firstChild;
  document.body.removeChild(frame);
  return el;
};

export const getViewportSize = () => {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  return {
    w,
    h
  };
};

export const deepExtend = (target, source) => {
  for (var prop in source)
    if (
      prop in target &&
      typeof target[prop] === "object" &&
      typeof source[prop] === "object"
    )
      deepExtend(target[prop], source[prop]);
    else target[prop] = source[prop];
  return target;
};