import api from './api';

export const jobService = {
  // Fetch all jobs
  getAllJobs: async (page, search) => {
    const response = await api.get('/jobs', { params: { page, search } });
    return response.data; // Returns the ApiResponse wrapper containing List<MainJobDetails>
  },

  // Fetch job by specific ID
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data; // Returns the ApiResponse wrapper containing a single MainJobDetails
  },

  // Create a new job
  createJob: async (jobData) => {
    const response = await api.post('/jobs/register', jobData);
    return response.data;
  },

  getAccounts: async () => {
    const response = await api.get('jobs/dropdowns/accounts');
    return response.data; // Assumes ApiResponse wrapper { success, data }
  },

  getContracts: async () => {
    const response = await api.get('jobs/dropdowns/contracts');
    return response.data;
  },

  getWorkActivities: async () => {
    const response = await api.get('jobs/dropdowns/work-activities');
    return response.data;
  },

  getContractLines: async () => {
    const response = await api.get('jobs/dropdowns/contract-lines');
    return response.data;
  },

  getCaseTypes: async () => {
    const response = await api.get('jobs/dropdowns/case-types');
    return response.data;
  },

  getMids: async () => {
    const response = await api.get('jobs/dropdowns/mids');
    return response.data;
  },

  getTids: async () => {
    const response = await api.get('jobs/dropdowns/tids');
    return response.data;
  },

  getCsis: async () => {
    const response = await api.get('jobs/dropdowns/csis');
    return response.data;
  },

  getSpOrigins: async () => {
    const response = await api.get('jobs/dropdowns/sp-origins');
    return response.data;
  },

  getSpExecutors: async () => {
    const response = await api.get('jobs/dropdowns/sp-executors');
    return response.data;
  },

  getKanwilPenerbits: async () => {
    const response = await api.get('jobs/dropdowns/kanwil-penerbits');
    return response.data;
  },

  getKanwilPelaksanas: async () => {
    const response = await api.get('jobs/dropdowns/kanwil-pelaksanas');
    return response.data;
  },

  exportJobsExcel: async () => {
    try {
      const response = await api.get('/jobs/export', {
        responseType: 'blob', // Crucial: Tells Axios to receive binary data
      });

      // 1. Create a Blob object from the binary data with correct MIME type
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // 2. Create a temporary local URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // 3. Create a temporary virtual <a> element to trigger browser download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'job_details_export.xlsx'; 

      document.body.appendChild(link);
      link.click();

      // 4. Cleanup
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      return { success: true, message: 'Export downloaded successfully!' };
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  }
};