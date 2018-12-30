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

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
export function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
export function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}