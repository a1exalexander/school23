const trancate = (text, length) => {
  const content = String(text);
  const trancated = content.slice(0, length);
  if (content.length < length) {
    return trancated;
  } else {
    const trancatedArray = trancated.split(' ');
    trancatedArray.pop();
    return `${trancatedArray.join(' ')}...`;
  }
};

export default trancate;
