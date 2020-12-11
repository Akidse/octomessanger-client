console.log(process.env);
export const API_CONST = {
    url: process.env.REACT_APP_API_SERVER_LINK || '',
    sockets_url: process.env.REACT_APP_SOCKET_SERVER_LINK || '',
};

console.log(API_CONST);