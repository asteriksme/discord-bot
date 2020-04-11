const getRandomColor = () => {
  const rgb = Math.floor(Math.random() * Math.floor(0x1000000));

  return `#${rgb.toString(16).padStart(6, '0')}`;
};

module.exports = {
  getRandomColor,
};
