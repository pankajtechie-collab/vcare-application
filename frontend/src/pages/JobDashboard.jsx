import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MetricCards from '../components/MetricCards';
import JobTable from '../components/JobTable';
import { jobService } from '../services/jobService';
import { useEffect, useState } from 'react';

export default function JobDashboard() {
  // State for dynamic job records and loading status
  const [jobData, setJobData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [jobStatusSearch, setJobStatusSearch] = useState('');

  // Debounce search input to prevent firing an API request on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(0); // Reset to page 0 whenever search filter changes
    }, 400); // 400ms delay

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch jobs from backend API on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getAllJobs(page, debouncedSearch);

        // Axios puts the server payload inside response.data
        const apiResponse = response.data;

        // Since backend wraps response in ApiResponse { success, message, data, timestamp }
        if (response.success) {
          setJobData(apiResponse || []);
        }

      } catch (error) {
        console.error("Failed to fetch jobs from backend:", error);
      }
    };

    fetchJobs();
  }, [page, debouncedSearch, searchQuery, jobStatusSearch]);

  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header />

        <div className="p-6 space-y-6">
          <MetricCards
            jobStatusSearch={jobStatusSearch}
            onJobStatusChange={(status) => setJobStatusSearch(status)} />
          <JobTable 
            jobData={jobData} 
            onPageChange={(newPage) => setPage(newPage)} 
            searchQuery={searchQuery}
            onSearchChange={(text) => setSearchQuery(text)}
          />
        </div>
      </main>
    </div>
  );
}