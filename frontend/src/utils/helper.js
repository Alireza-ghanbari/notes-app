export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initiasl = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initiasl += words[i][0];
  }

  return initiasl.toUpperCase();
};
