export default (
  tagName = 'div',
  { className, text } = { className: '', text: null }
) => {
  const element = document.createElement(tagName);
  if (className) element.className += className;
  if (text) element.innerHTML = text;

  element.onclick = () =>
    import("./lazy")
      .then(lazy => {
        element.textContent = lazy.default;
      })
      .catch(err => {
        console.error(err);
      });

  return element;
};
