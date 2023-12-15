const getToken = () => {
    return localStorage.getItem('token');
};

const getConfig = () => {
    const token = getToken();
    return {
      headers: {
        Authorization: `bearer ${token}`
      }
    };
};

export default {
    getConfig,
    getToken
};
