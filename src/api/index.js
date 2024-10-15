export const SERVER_BASE_URL =
  `https://fact-1-1.onrender.com` || `http://localhost:3000`;

export const API = {
  users: {
    login: `${SERVER_BASE_URL}/auth/login`,
    register: `${SERVER_BASE_URL}/auth/add-user`,
    fetchAllUsers: `${SERVER_BASE_URL}/auth/fetch-users`,
    editUser: `${SERVER_BASE_URL}/auth/edit-user`,
  },
  tasks: {
    updateStatus: `${SERVER_BASE_URL}/todo/updateStatus`,
    deleteTask: `${SERVER_BASE_URL}/todo/deleteTask`,
  },
  inventory: {
    getItems: `${SERVER_BASE_URL}/inventory/get-items`,
    getItemById: `${SERVER_BASE_URL}/inventory/get-item`,
    addItems: `${SERVER_BASE_URL}/inventory/add-item`,
    updateItems: `${SERVER_BASE_URL}/inventory/update-item`,
    deleteItems: `${SERVER_BASE_URL}/inventory/delete-item`,
  },
  production: {
    getAllProduction: `${SERVER_BASE_URL}/production/get-all-productions`,
    startNew: `${SERVER_BASE_URL}/production/start-new`,
  },
};
