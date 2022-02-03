export default (isRefresh = false) => {
  const Authorization =
    localStorage.getItem(
      isRefresh ? "rost__refreshToken" : "battlePang__token"
    ) ||
    sessionStorage.getItem(
      isRefresh ? "rost__refreshToken" : "battlePang__token"
    );
  return { Authorization };
};
