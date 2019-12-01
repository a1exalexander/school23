const trancate = (text, length) => {
  const content = String(text);
  const trancated = content.slice(0, length);
  if (content.length < length) {
    return trancated;
  } else {
    const trancatedArray = trancated.split(' ');
    const lastChild = trancatedArray.length - 1;
    trancatedArray.splice(lastChild, 1, `${trancatedArray[lastChild]}...`);
    return trancatedArray.join(' ');
  }
};

export const getContent = (content) => {
  let html = content;
  return html.replace(/<[^>]*>/g, " ");
}
// Gabi's elegant approach, but eliminating one unnecessary line of code:
export const gabiContent = (content) => {
  let html = content;
  return html.innerText || html.textContent;
}

export default trancate;
