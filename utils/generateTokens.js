function generateTokens(text) {
  return text.toLowerCase().split(/\s+/);
}

export default generateTokens;
