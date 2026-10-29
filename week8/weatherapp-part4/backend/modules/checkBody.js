function checkBody(body, keys) {
  return keys.every((key) => {
    return (
      Object.prototype.hasOwnProperty.call(body, key) &&
      typeof body[key] === 'string' &&
      body[key].trim() !== ''
    );
  });
}

module.exports = { checkBody };
