import React from 'react';
import { FiFileText, FiClock } from 'react-icons/fi';

export default function MetricCards({jobStatusSearch, onJobStatusChange}) {
  const cards = [
    { title: "Registered", color: "bg-blue-500", icon: <FiFileText className="text-blue-500 text-sm" />, textClass: "text-gray-500", borderColor: "border-blue-500 border-2" },
    { title: "In Progress", color: "bg-amber-500", icon: <FiClock className="text-amber-500 text-sm" />, textClass: "text-gray-600", borderColor: "border-amber-500 border-2" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`dashboard-card p-4 flex items-center justify-between relative overflow-hidden ${card.span || ''} ${card.borderColor || ''} font-color-500`}>
          <div className={`absolute top-0 left-0 w-1 h-full ${card.color}`}></div>
          <div>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${card.textClass}`}>
              {card.icon} {card.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}