import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiChevronUp, FiSearch } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService'; // Ensure this points to your job service file

export default function RegisterNewJobForm() {
  const [activeTab, setActiveTab] = useState('asset');
  const navigate = useNavigate();

  // 1. Form state mapped to your backend fields
  const [formData, setFormData] = useState({
    accountId: '',
    contractId: '',
    workActivityId: '',
    contractLineId: '',
    jobNumber: '',
    caseId: '',
    caseTypeId: '',
    referenceNumber: '',
    spkReference: '',
    jobDescription: '',
    isSlaPriority: false,
    midId: '',
    tidId: '',
    csiId: '',
    jobMerchantName: '',
    jobAddress: '',
    jobCity: '',
    jobPostalCode: '',
    spOriginId: '',
    spExecutorId: '',
    kanwilPenerbitId: '',
    kanwilPelaksanaId: '',
    jobRegisteredOn: '',
    jobReceivedOn: '',
    jobActualTargetDate: '',
    jobUpdateToCustomerDate: '',
    jobExpectedResponseDate: '',
    jobExpectedCompletionDate: ''
  });

  // 2. Dropdown dynamic data state
  const [dropdowns, setDropdowns] = useState({
    accounts: [],
    contracts: [],
    workActivities: ['Technical Support'],
    contractLines: [],
    caseTypes: [],
    mids: [],
    tids: [],
    csis: [],
    spOrigins: [],
    spExecutors: [],
    kanwilPenerbitOptions: [],
    kanwilPelaksanaOptions: []
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 3. Fetch all individual dropdown options from backend concurrently on mount
  useEffect(() => {
    const fetchMasterDropdowns = async () => {
      setLoading(true);
      try {
        const [
          accountsRes,
          contractsRes,
          activitiesRes,
          contractLinesRes,
          caseTypesRes,
          midsRes,
          tidsRes,
          csisRes,
          spOriginsRes,
          spExecutorsRes,
          kanwilPenerbitsRes,
          kanwilPelaksanaRes
        ] = await Promise.all([
          jobService.getAccounts(),
          jobService.getContracts(),
          jobService.getWorkActivities(),
          jobService.getContractLines(),
          jobService.getCaseTypes(),
          jobService.getMids(),
          jobService.getTids(),
          jobService.getCsis(),
          jobService.getSpOrigins(),
          jobService.getSpExecutors(),
          jobService.getKanwilPenerbits(),
          jobService.getKanwilPelaksanas()
        ]);

        setDropdowns({
          accounts: accountsRes?.data || [],
          contracts: contractsRes?.data || [],
          workActivities: activitiesRes?.data || ['Technical Support'],
          contractLines: contractLinesRes?.data || [],
          caseTypes: caseTypesRes?.data || [],
          mids: midsRes?.data || [],
          tids: tidsRes?.data || [],
          csis: csisRes?.data || [],
          spOrigins: spOriginsRes?.data || [],
          spExecutors: spExecutorsRes?.data || [],
          kanwilPenerbitOptions: kanwilPenerbitsRes?.data || [],
          kanwilPelaksanaOptions: kanwilPelaksanaRes?.data || []
        });

      } catch (err) {
        console.warn("Backend endpoints failed or not fully active, using fallback options for UI layout.", err);
        // Fallback simulation data if needed
        setDropdowns({
          accounts: [{ id: 1, name: 'Account Alpha' }, { id: 2, name: 'Account Beta' }],
          contracts: [{ id: 1, name: 'Contract-2026-01' }],
          workActivities: [{ id: 1, name: 'Technical Support' }],
          contractLines: [{ id: 1, name: 'Line A' }],
          caseTypes: [{ id: 1, name: 'Hardware Replacement' }],
          mids: [{ id: 1, name: 'MID-992101' }],
          tids: [{ id: 1, name: 'TID-1102' }],
          csis: [{ id: 1, name: 'CSI-01' }],
          spOrigins: [{ id: 1, name: 'Origin Jakarta' }],
          spExecutors: [{ id: 1, name: 'Executor Team A' }],
          kanwilPenerbitOptions: [{ id: 1, name: 'Kanwil Pusat' }]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMasterDropdowns();
  }, []);

  // Handle value changes across inputs, selects, and checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission to Spring Boot backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const payload = {
      ...formData,
      isSlaPriority: formData.isSlaPriority ? 1 : 0,
      // Agar date selected hai toh uske sath 'T00:00:00' jod do, warna null bhejo
      jobRegisteredOn: formData.jobRegisteredOn ? `${formData.jobRegisteredOn}T00:00:00` : null,
      jobReceivedOn: formData.jobReceivedOn ? `${formData.jobReceivedOn}T00:00:00` : null,
      jobActualTargetDate: formData.jobActualTargetDate ? `${formData.jobActualTargetDate}T00:00:00` : null,
      jobUpdateToCustomerDate: formData.jobUpdateToCustomerDate ? `${formData.jobUpdateToCustomerDate}T00:00:00` : null,
      jobExpectedResponseDate: formData.jobExpectedResponseDate ? `${formData.jobExpectedResponseDate}T00:00:00` : null,
      jobExpectedCompletionDate: formData.jobExpectedCompletionDate ? `${formData.jobExpectedCompletionDate}T00:00:00` : null,
    };

    try {
      const response = await jobService.createJob(payload);

      if (response?.success) {
        alert('Job registered successfully!');
        navigate('/register-job-choices'); // Redirect back or to dashboard
      }
    } catch (err) {
      console.error("Failed to save job data:", err);
      setErrorMessage(response?.message || 'Failed to register job. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const goBacktoRegisterChoices = () => {
    navigate('/register-job-choices');
  };

  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans overflow-hidden">
      
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full p-6 space-y-6">
          
          {/* Header & Back Button */}
          <div className="flex items-center gap-4">
            <button type="button" className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover: transition shadow-sm bg-white" onClick={goBacktoRegisterChoices}>
              <FiArrowLeft className="text-sm" /> Back
            </button>
            <div>
              <h2 className="text-xl font-bold text-[#2B3674]">Register New Job</h2>
              <p className="text-xs  mt-0.5">Silahkan lengkapi seluruh informasi yang diperlukan untuk menambahkan data baru.</p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECTION 1: Job Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 /50 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-[#0061F2] text-sm">Job Information</span>
                <FiChevronUp className=" text-sm" />
              </div>
              <div className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Account <span className="text-red-500">*</span></label>
                    <select name="accountId" value={formData.accountId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500" required>
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.accounts.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Contract <span className="text-red-500">*</span></label>
                    <select name="contractId" value={formData.contractId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500" required>
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.contracts.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Work Activity <span className="text-red-500">*</span></label>
                    <select name="workActivityId" value={formData.workActivityId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500" required>
                      {dropdowns.workActivities.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Contract Line <span className="text-red-500">*</span></label>
                    <select name="contractLineId" value={formData.contractLineId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500" required>
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.contractLines.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Job Number</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="Job Number" name="jobNumber" value={formData.jobNumber} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Case ID <span className="text-red-500">*</span></label>
                    <input type="text" name="caseId" value={formData.caseId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Type here" required />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Case Type <span className="text-red-500">*</span></label>
                    <select name="caseTypeId" value={formData.caseTypeId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500" required>
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.caseTypes.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Reference Number</label>
                    <input type="number" name="referenceNumber" value={formData.referenceNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="Reference Number" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">SPK Reference</label>
                    <input type="number" name="spkReference" value={formData.spkReference} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="SPK Reference" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Description</label>
                  <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Type here"></textarea>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="isSlaPriority" name="isSlaPriority" checked={formData.isSlaPriority} onChange={handleChange} className="w-4 h-4 text-[#0061F2] border-gray-300 rounded focus:ring-blue-500" />
                  <label htmlFor="isSlaPriority" className="font-semibold text-gray-700">SLA Priority</label>
                </div>
              </div>
            </div>

            {/* SECTION 2: Merchant Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 /50 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-[#0061F2] text-sm">Merchant Information</span>
                <FiChevronUp className=" text-sm" />
              </div>
              <div className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">MID</label>
                    <select name="midId" value={formData.midId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.mids.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">TID</label>
                    <select name="tidId" value={formData.tidId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.tids.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">CSI</label>
                    <select name="csiId" value={formData.csiId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.csis.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Merchant Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="Merchant Name" name="jobMerchantName" value={formData.jobMerchantName} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Address</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="Address" name="jobAddress" value={formData.jobAddress} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">City</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="City" name="jobCity" value={formData.jobCity} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Postal Code</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="Postal Code" name="jobPostalCode" value={formData.jobPostalCode} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">SP Origin</label>
                    <select name="spOriginId" value={formData.spOriginId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.spOrigins.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">SP Executor</label>
                    <select name="spExecutorId" value={formData.spExecutorId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.spExecutors.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Kanwil Pelaksana</label>
                    <select name="kanwilPelaksanaId" value={formData.kanwilPelaksanaId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.kanwilPelaksanaOptions.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Kanwil Penerbit</label>
                    <select name="kanwilPenerbitId" value={formData.kanwilPenerbitId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:border-blue-500">
                      <option value="" disabled>Nothing selected</option>
                      {dropdowns.kanwilPenerbitOptions.map((item, idx) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Additional Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 /50 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-[#0061F2] text-sm">Additional Information</span>
                <FiChevronUp className=" text-sm" />
              </div>
              <div className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Registered On <span className="text-red-500">*</span></label>
                    <input type="date" name="jobRegisteredOn" value={formData.jobRegisteredOn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Received On <span className="text-red-500">*</span></label>
                    <input type="date" name="jobReceivedOn" value={formData.jobReceivedOn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Actual Target Date <span className="text-red-500">*</span></label>
                    <input type="date" name="jobActualTargetDate" value={formData.jobActualTargetDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-500" required />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Updated to Customer Date</label>
                    <input type="date" name="jobUpdateToCustomerDate" className="w-full px-3 py-2 border border-gray-200 rounded-xl   focus:outline-none" placeholder="Updated to Customer Date" value={formData.jobUpdateToCustomerDate} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Expected Response Date</label>
                    <input type="date" name="jobExpectedResponseDate" className="w-full px-3 py-2 border border-gray-200 rounded-xl  focus:outline-none" placeholder="Expected Response Date" value={formData.jobExpectedResponseDate} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Expected Completion Date</label>
                    <input type="date" name="jobExpectedCompletionDate" className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none" placeholder="Expected Completion Date" value={formData.jobExpectedCompletionDate} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: Tabs & Table Component */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex  p-1 rounded-xl text-xs font-semibold">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('asset')}
                  className={`flex-1 py-2 rounded-lg transition ${activeTab === 'asset' ? 'bg-[#0061F2] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Asset
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('feature')}
                  className={`flex-1 py-2 rounded-lg transition ${activeTab === 'feature' ? 'bg-[#0061F2] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Feature
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('logHistory')}
                  className={`flex-1 py-2 rounded-lg transition ${activeTab === 'logHistory' ? 'bg-[#0061F2] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Log History
                </button>
              </div>

              <div className="dashboard-card p-3 flex items-center gap-3 border border-gray-200 rounded-xl">
                <FiSearch className=" text-lg ml-2" />
                <input type="search" placeholder="Searching here..." className="w-full text-xs text-gray-700 focus:outline-none bg-transparent" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-semibold  uppercase tracking-wider /50">
                      <th className="py-3 px-4">No</th>
                      <th className="py-3 px-4">Product Type</th>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4">Serial Number</th>
                      <th className="py-3 px-4">Task</th>
                      <th className="py-3 px-4">Asset Location</th>
                      <th className="py-3 px-4">Peripheral</th>
                      <th className="py-3 px-4">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="hover:/50 transition">
                      <td className="py-4 px-4 font-semibold ">1</td>
                      <td className="py-4 px-4">EDC</td>
                      <td className="py-4 px-4 font-bold text-gray-800">EDC Ingenico WYL</td>
                      <td className="py-4 px-4 font-mono text-[11px] text-gray-500">SN-EDC-88921</td>
                      <td className="py-4 px-4">PM</td>
                      <td className="py-4 px-4">Open SP</td>
                      <td className="py-4 px-4"><a href="#peripheral" className="text-[#0061F2] underline font-semibold">5 Peripheral</a></td>
                      <td className="py-4 px-4 ">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Form Footer Actions */}
            <div className="flex justify-end gap-3 pb-6">
              <button type="button" onClick={goBacktoRegisterChoices} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover: transition shadow-sm bg-white">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-5 py-2 bg-[#0061F2] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-blue-500/20 disabled:opacity-50">
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>

          </form>
        </div>
      </main>

    </div>
  );
}