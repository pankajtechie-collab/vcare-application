import React from 'react';
import { FiSearch, FiChevronDown, FiSettings } from 'react-icons/fi';

export default function JobTable({ jobData, onPageChange, searchQuery, onSearchChange }) {
  const formatStatus = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    // Check if date is invalid
    if (isNaN(date.getTime())) return dateString;

    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
    };

    // Format to something like "12 Oct 2022, 00:00" and remove the comma
    return new Intl.DateTimeFormat('en-GB', options)
      .format(date)
      .replace(',', '');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Registered' : return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'In Progress': return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
      default: return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  // Safely extract content array from the paginated backend response structure
  const jobs = jobData?.content || jobData;

  // Calculate dynamic display range (e.g., "1 - 5 of 5 items")
  const startItem = jobData ? jobData.number * jobData.size + (jobs?.length ? 1 : 0) : 1;
  const endItem = jobData ? startItem + (jobs?.length || 0) - 1 : (jobs?.length || 0);
  const totalItems = jobData?.totalElements || jobs?.length || 0;
  const totalPages = jobData?.totalPages || 1;
  const currentPage = jobData ? jobData.number + 1 : 1;

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="dashboard-card p-3 flex items-center gap-3">
        <FiSearch className="text-gray-400 text-lg ml-2" />
        <input 
          type="text" 
          placeholder="Search by Job No, Merchant Name, Activity..." 
          className="w-full text-xs text-gray-700 focus:outline-none placeholder-gray-400 bg-transparent"
          value={searchQuery || ''}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Table Card */}
      <div className="dashboard-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Job No <FiChevronDown className="inline text-gray-400 text-xs" /></th>
                <th className="py-3 px-4">Merchant / Account / Reference Number <FiChevronDown className="inline text-gray-400 text-xs" /></th>
                <th className="py-3 px-4">Activity <FiChevronDown className="inline text-gray-400 text-xs" /></th>
                <th className="py-3 px-4">MID,TID,CSI <FiChevronDown className="inline text-gray-400 text-xs" /></th>
                <th className="py-3 px-4">Target Date / Response Time <FiChevronDown className="inline text-gray-400 text-xs" /></th>
                <th className="py-3 px-4">Service Point<FiChevronDown className="inline text-gray-400 text-xs" /></th>
                <th className="py-3 px-4">Job Status <FiChevronDown className="inline text-gray-400 text-xs" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {!jobs || jobs.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-4 px-4 text-center text-gray-400">
                    No job data available.
                  </td>
                </tr>
              ) : (
                jobs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 font-semibold text-gray-400">{item.id}</td>
                    <td className="py-4 px-4 font-medium text-[#0061F2] whitespace-pre-line leading-relaxed">
                      {item.jobNumber}
                    </td>
                    <td className="py-4 px-4 whitespace-pre-line leading-relaxed">
                      <div className="font-bold text-gray-800">{item.jobMidData.merchantName}</div>
                      <div className="text-[11px] text-gray-500">{item.jobMidData.address}</div>
                      <div className="text-[10px] text-gray-400">{item.jobCity}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 font-medium">{item.workActivity.name}</td>
                    <td className="py-4 px-4 whitespace-pre-line font-mono text-[11px] text-gray-500">
                      {item.jobMidData.merchantId} / {item.jobTidData.tid} / {item.jobCsiData.csi}
                    </td>
                    <td className="py-4 px-4 whitespace-pre-line font-mono text-[11px] text-gray-500">
                      TD: {formatDate(item.jobActualTargetDate)} / RT: {formatDate(item.jobExpectedResponseDate)}
                    </td>
                    <td className="py-4 px-4 whitespace-pre-line font-mono text-[11px] text-gray-500">
                      {item.jobSpOriginData.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-semibold inline-block ${getStatusBadge(formatStatus(item.jobStatus))}`}>
                        {formatStatus(item.jobStatus)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 bg-white">
          <div>
            {totalItems > 0 ? `${startItem} - ${endItem} of ${totalItems} items` : '0 items'}
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => onPageChange && onPageChange(currentPage - 2)} 
              disabled={currentPage <= 1}
              className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-1 font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Render dynamic page number buttons based on totalPages */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange && onPageChange(index)}
                  className={`w-8 h-8 rounded-lg font-medium flex items-center justify-center ${
                    isActive
                      ? 'bg-[#0061F2] text-white font-bold shadow-sm shadow-blue-500/30'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              onClick={() => onPageChange && onPageChange(currentPage)} 
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-1 font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}