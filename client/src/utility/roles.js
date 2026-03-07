export const ROLES = {
  ADMIN: 0,
  USER: 1,
  MANAGER: 2,
  SELLER: 3,
};

Object.freeze(ROLES);

// role name mapping
export const ROLE_NAMES = {
  0: "Admin",
  1: "User",
  2: "Manager",
  3: "Seller",
};

// helper function
export const getRoleName = (role) => {
  return ROLE_NAMES[role] || "Unknown";
};
