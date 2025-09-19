import React from 'react';
import { FiUser, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";


const recentActivity = [
  { name: "Sarah Johnson", role: "Senior React Developer", time: "2 hours ago", color: "text-blue-500 bg-blue-50", icon: <FiUser /> },
  { name: "Mike Chen", role: "UX Designer", time: "4 hours ago", color: "text-yellow-500 bg-yellow-50", icon: <FiClock /> },
  { name: "Emily Davis", role: "Product Manager", time: "1 day ago", color: "text-purple-500 bg-purple-50", icon: <FiUser /> },
  { name: "Alex Rodriguez", role: "DevOps Engineer", time: "2 days ago", color: "text-green-500 bg-green-50", icon: <FiCheckCircle /> },
];



function RecentActivity() {
  return (
 <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col border-gray-300">
        <div className="flex items-center mb-8">
          <FiClock className="w-6 h-6 text-blue-400 mr-2" />
          <h2 className="text-lg font-bold text-gray-700">Recent Activity</h2>
        </div>
        {recentActivity.map(item => (
          <div key={item.name} className="flex items-center mb-8 last:mb-0">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 ${item.color}`}>{item.icon}</div>
            <div>
              <span className="font-semibold text-gray-800">{item.name}</span>
              <div className="text-sm text-gray-500">{item.role}</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>
  )
}

export default RecentActivity
