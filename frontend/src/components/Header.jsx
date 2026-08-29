import React, {useState} from 'react';
import { FiFilter, FiDownload, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';

export default function Header() {
    const navigate = useNavigate(); // Initialize navigate function
    const [exportLoading, setExportLoading] = useState(false);

    const gotoAddNewForm = () => {
        navigate('/register-job-choices'); // Navigate to the form page
    };

    const handleExportClick = async () => {
      setExportLoading(true);
      try {
        await jobService.exportJobsExcel();
      } catch (error) {
        alert('Failed to download Excel file.');
      } finally {
        setExportLoading(false);
      }
    };


  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-10 shadow-sm">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-[#2B3674]">Job - CM</h2>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">Daftar, lihat, perbarui, dan kelola akun di satu tempat terpusat.</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition shadow-sm" onClick={handleExportClick}>
          <FiDownload className="text-sm" /> {exportLoading ? 'Exporting...' : 'Export'}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0061F2] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-blue-500/20" onClick={gotoAddNewForm}>
          <FiPlus className="text-sm" /> Add New Job
        </button>
      </div>
    </header>
  );
}