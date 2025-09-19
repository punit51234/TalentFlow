import React from 'react';
import { FiUser, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";


const urgentTasks = [
  { label: "Review 5 new applications for Senior Developer role", priority: "high", due: "Today", color: "bg-red-500 text-white", dot: "bg-red-400" },
  { label: "Schedule interviews for UX Designer position", priority: "medium", due: "Tomorrow", color: "bg-gray-200 text-gray-700", dot: "bg-yellow-400" },
  { label: "Send offer letter to Emily Davis", priority: "high", due: "Today", color: "bg-red-500 text-white", dot: "bg-red-400 text-white" },
];

function UrgentTasks() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <FiAlertCircle className="w-6 h-6 text-yellow-400 mr-2" />
          <h2 className="text-lg font-bold text-gray-700">Urgent Tasks</h2>
        </div>
        {urgentTasks.map(task => (
          <div key={task.label} className="mb-8 last:mb-0">
            <div>
                <span className={`inline-block w-3 h-3 rounded-full ${task.dot} mr-3`} />
            <span className="font-semibold text-gray-800">{task.label}</span>
            </div>
            <div>
                <span className={`ml-3 px-2 py-0.5 text-xs font-semibold rounded-xl ${task.color}`}>
              {task.priority}
            </span>
            <span className="ml-3 text-xs text-gray-800">Due: {task.due}</span>
            </div>
          </div>
        ))}
      </div>
  )
}

export default UrgentTasks
