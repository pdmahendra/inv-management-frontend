export const SERVER_BASE_URL = `${
  import.meta.env.VITE_BACKEND_SERVER_URL ||
  "https://fact-1-production.up.railway.app"
}`;

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
    addItems: `${SERVER_BASE_URL}/inventory/add-item`,
    updateItems: `${SERVER_BASE_URL}/inventory/update-item`,
    deleteItems: `${SERVER_BASE_URL}/inventory/delete-item`,
  },
};
