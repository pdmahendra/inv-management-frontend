export const SERVER_BASE_URL = `https://fact-1-ilrku6cmk-adway7103s-projects.vercel.app/`;
export const API = {
  users: {
    login: `${SERVER_BASE_URL}/auth/login`,
    register: `${SERVER_BASE_URL}/auth/add-user`,
    fetchAllUsers: `${SERVER_BASE_URL}/auth/fetch-users`,
    editUser: `${SERVER_BASE_URL}/auth/edit-user`,
    deleteUser: `${SERVER_BASE_URL}/auth/delete-user`,
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
    bulkUpdatePrice: `${SERVER_BASE_URL}/inventory/bulk-update-price`,
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
  notification: {
    getNotifications: `${SERVER_BASE_URL}/notifications`,
  },
  activityLogs: {
    getActivityLogs: `${SERVER_BASE_URL}/activity-logs`,
  },
  upload: {
    imgUpload: `${SERVER_BASE_URL}/upload`,
  },
};
