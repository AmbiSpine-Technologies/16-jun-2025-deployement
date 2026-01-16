
export const STORAGE_KEY = "socialAppState";

export const loadState = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
};

export const saveState = (state) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(
    "redux_user",
    JSON.stringify({
      currentUser: state.currentUser,
    })
  );
};
