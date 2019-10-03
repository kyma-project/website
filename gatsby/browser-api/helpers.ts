function cumulativeOffset(element: HTMLElement): number {
  let top = 0;
  do {
    top += element.offsetTop || 0;
    element = element && (element.offsetParent as HTMLElement);
  } while (element);

  return top;
}

export const getTargetOffset = (hash: string): number | null => {
  const id = window.decodeURI(hash.replace(`#`, ``));
  if (!id) {
    return null;
  }

  const element = document.getElementById(id);
  if (!element) {
    return null;
  }

  return cumulativeOffset(element);
};
