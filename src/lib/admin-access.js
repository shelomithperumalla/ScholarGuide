// Only these emails have admin access to the ScholarGuide platform
export const ADMIN_EMAILS = [
  "perumallabalashelomith123@gmail.com",
  "galenaphose@gmail.com",
  "galenaphos@gmail.com",
  "sudheersamudrala56@gmail.com",
  "madakapoojasri@gmail.com",
];

export const isAdmin = (user) => {
  if (!user?.email) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
};