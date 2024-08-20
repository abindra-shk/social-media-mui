const users = [
  {
    email: "atapas@email.com",
    password: "password",
  },
  {
    email: "alex@email.com",
    password: "password",
  },
  {
    email: "bob@email.com",
    password: "password",
  },
];

export const getUserByEmail = (email: any) => {
  const found = users.find((user) => user.email === email);
  return found;
};
