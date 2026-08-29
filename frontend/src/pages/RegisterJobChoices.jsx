import React, { useState } from 'react';
import { FiArrowLeft, FiUpload, FiEdit } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function RegisterFormChoices() {
  const navigate = useNavigate(); // Initialize navigate function

  const goBacktoDashboard = () => {
      navigate('/'); // Navigate to the form page
  };

  const gotoRegisterJobForm = () => {
      navigate('/register-new-job-form'); // Navigate to the form page
  };

  const gotoRegisterJobUploadForm = () => {
      navigate('/register-job-upload-data'); // Navigate to the upload form page
  };

  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans overflow-hidden">
      
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full p-6 space-y-6">
          
          {/* Header & Back Button */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <button 
              type="button" 
              onClick={goBacktoDashboard}
              className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition shadow-sm bg-white"
            >
              <FiArrowLeft className="text-sm" /> Back
            </button>
            <div>
              <h2 className="text-xl font-bold text-[#2B3674]">Register New Job</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Pilih metode pendaftaran yang Anda inginkan. Anda dapat mengunggah data lowongan kerja secara massal menggunakan file Excel atau memasukkan informasi tersebut secara manual.
              </p>
            </div>
          </div>

          {/* Choice Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 pt-4">
            {/* Card 2: Manual Job Registration */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-between transition-all hover:shadow-md">
              <div className="w-full h-40 bg-blue-50/50 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                <FiEdit className="text-4xl text-[#0061F2]" />
              </div>
              <h3 className="text-sm font-bold text-[#2B3674] mb-6">Manual Job Registration</h3>
              <button 
                type="button"
                onClick={gotoRegisterJobForm}
                className="w-full py-2.5 border border-blue-200 text-[#0061F2] bg-blue-50/50 hover:bg-blue-100/50 rounded-xl text-xs font-semibold transition shadow-sm"
              >
                Choose
              </button>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}