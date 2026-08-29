import React, { useState } from 'react';
import { 
  FiGrid, FiLayers, FiCheckSquare, FiChevronDown, FiChevronUp, 
  FiChevronRight, FiLogOut, FiSettings 
} from 'react-icons/fi';

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({
    master: true,
    job: true
  });

  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  return (
    <aside className="w-64 sidebar-gradient text-white flex flex-col justify-between hidden lg:flex shadow-xl z-20">
      <div>
        {/* Logo Brand */}
        <div className="p-6 flex flex-col items-center border-b border-blue-500/30">
          <div className="bg-white p-2 rounded-2xl shadow-md mb-2">
            <svg className="w-8 h-8 text-[#0061F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="font-extrabold tracking-wider text-lg">VCARE 2.0</h1>
          <span className="text-[10px] tracking-widest text-blue-200 uppercase font-semibold">Application</span>
        </div>

        {/* User Profile Card */}
        <div className="mx-4 mt-5 p-3 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
              alt="Admin" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <h4 className="text-sm font-bold leading-tight">Admin</h4>
              <a href="#profile" className="text-xs text-blue-200 hover:underline">View Profile</a>
            </div>
          </div>
          <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
            <FiLogOut className="text-white text-sm" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-4 space-y-1.5 text-sm">
          <a href="#dashboard" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition text-blue-100 font-medium">
            <span className="flex items-center gap-3"><FiGrid className="text-lg" /> Dashboard</span>
            <FiChevronRight className="text-xs text-blue-300" />
          </a>
          
          {/* Master Dropdown */}
          <div>
            <button 
              onClick={() => toggleMenu('master')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition text-blue-100 font-medium"
            >
              <span className="flex items-center gap-3"><FiLayers className="text-lg" /> Master</span>
              {openMenus.master ? <FiChevronUp className="text-xs text-blue-300" /> : <FiChevronDown className="text-xs text-blue-300" />}
            </button>
            {openMenus.master && (
              <div className="pl-11 space-y-1 mt-1 text-xs text-blue-200 transition-all duration-200">
                <a href="#contract" className="block py-2 hover:text-white transition">Contract</a>
                <a href="#city" className="block py-2 hover:text-white transition">City</a>
                <a href="#asset" className="block py-2 hover:text-white transition">Asset</a>
                <a href="#approval" className="block py-2 hover:text-white transition">Approval</a>
                <a href="#storage" className="block py-2 hover:text-white transition">Manage Storage</a>
              </div>
            )}
          </div>

          {/* Job Menu */}
          <div>
            <button 
              onClick={() => toggleMenu('job')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white text-[#0061F2] font-semibold shadow-lg"
            >
              <span className="flex items-center gap-3"><FiCheckSquare className="text-lg text-[#0061F2]" /> Job</span>
              {openMenus.job ? <FiChevronUp className="text-xs text-gray-500" /> : <FiChevronDown className="text-xs text-gray-500" />}
            </button>
            {openMenus.job && (
              <div className="pl-11 space-y-1 mt-1 text-xs text-blue-200 transition-all duration-200">
                <a href="#spk" className="block py-2 hover:text-white transition">SPK</a>
                <a href="#cm" className="block py-2 text-white font-bold transition">CM</a>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="p-4 text-center text-[10px] text-blue-300">
        VCare 2.0 Dashboard &copy; 2026
      </div>
    </aside>
  );
}