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
    getItemsBySubcategory: `${SERVER_BASE_URL}/inventory/getItemsBySubcategory`,
    getItemById: `${SERVER_BASE_URL}/inventory/get-item`,
    addItems: `${SERVER_BASE_URL}/inventory/add-item`,
    updateItems: `${SERVER_BASE_URL}/inventory/update-item`,
    deleteItems: `${SERVER_BASE_URL}/inventory/delete-item`,
  },
  production: {
    getAllProduction: `${SERVER_BASE_URL}/production/get-all-productions`,
    getMyProductions: `${SERVER_BASE_URL}/production/get-my-productions`,
    getProductionById: `${SERVER_BASE_URL}/production/getProductionById`,
    generatePdf: `${SERVER_BASE_URL}/production/generate-pdf`,
    startNew: `${SERVER_BASE_URL}/production/start-new`,
    update: `${SERVER_BASE_URL}/production/update`,
  },
  lifecycle: {
    startNewLifecycle: `${SERVER_BASE_URL}/lifecycle/start-new-lifecycle`,
    getAllLifecycle: `${SERVER_BASE_URL}/lifecycle/get-all-lifecycle`,
    getMyLifecycle: `${SERVER_BASE_URL}/lifecycle/get-my-stages`,
    generatePdf: `${SERVER_BASE_URL}/lifecycle/generate-pdf`,
    update: `${SERVER_BASE_URL}/lifecycle/update`,
  },
  issuance: {
    issueInventoryItems: `${SERVER_BASE_URL}/issuance/issue-inventory-items`,
    getIssuanceRecords: `${SERVER_BASE_URL}/issuance/issuance-records`,
    getLotIssuanceRecords: `${SERVER_BASE_URL}/issuance/issuance-record`,
    getMyIssuanceRecords: `${SERVER_BASE_URL}/issuance/my-issuance-record`,
  },
};
