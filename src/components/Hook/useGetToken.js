const useGetToken = () => {
  const gettoken = localStorage.getItem("token");
  const token = JSON.parse(gettoken);
  if (gettoken) {
    return token;
  }
};

export default useGetToken;
