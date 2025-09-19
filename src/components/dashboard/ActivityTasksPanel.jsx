import { FiUser, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// Sample dynamic data
const recentActivity = [
  { name: "Sarah Johnson", role: "Senior React Developer", time: "2 hours ago", color: "text-blue-500 bg-blue-50", icon: <FiUser /> },
  { name: "Mike Chen", role: "UX Designer", time: "4 hours ago", color: "text-yellow-500 bg-yellow-50", icon: <FiClock /> },
  { name: "Emily Davis", role: "Product Manager", time: "1 day ago", color: "text-purple-500 bg-purple-50", icon: <FiUser /> },
  { name: "Alex Rodriguez", role: "DevOps Engineer", time: "2 days ago", color: "text-green-500 bg-green-50", icon: <FiCheckCircle /> },
];

const urgentTasks = [
  { label: "Review 5 new applications for Senior Developer role", priority: "high", due: "Today", color: "bg-red-500", dot: "bg-red-400" },
  { label: "Schedule interviews for UX Designer position", priority: "medium", due: "Tomorrow", color: "bg-gray-200 text-gray-700", dot: "bg-yellow-400" },
  { label: "Send offer letter to Emily Davis", priority: "high", due: "Today", color: "bg-red-500", dot: "bg-red-400" },
];

export default function ActivityTasksPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mb-8 mt-8">
      {/* Recent Activity Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <FiClock className="w-6 h-6 text-blue-400 mr-2" />
          <h2 className="text-lg font-bold text-gray-700">Recent Activity</h2>
        </div>
        {recentActivity.map(item => (
          <div key={item.name} className="flex items-center mb-5 last:mb-0">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 ${item.color}`}>{item.icon}</div>
            <div>
              <span className="font-semibold text-gray-800">{item.name}</span>
              <div className="text-sm text-gray-500">{item.role}</div>
            </div>
            <span className="ml-auto text-xs text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>

      {/* Urgent Tasks Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <FiAlertCircle className="w-6 h-6 text-yellow-400 mr-2" />
          <h2 className="text-lg font-bold text-gray-700">Urgent Tasks</h2>
        </div>
        {urgentTasks.map(task => (
          <div key={task.label} className="flex items-center mb-5 last:mb-0">
            <span className={`inline-block w-3 h-3 rounded-full ${task.dot} mr-3`} />
            <span className="font-semibold text-gray-800">{task.label}</span>
            <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded ${task.color}`}>
              {task.priority}
            </span>
            <span className="ml-3 text-xs text-gray-400">Due: {task.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}