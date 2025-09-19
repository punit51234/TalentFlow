import React, { useState } from "react";

const newNotifications = [
  {
    id: 1,
    title: "System Update",
    description:
      "Scheduled maintenance on Friday at 5:00 PM. Expect 30 minutes downtime.",
    time: "Just now",
  },
  {
    id: 2,
    title: "Meeting Reminder",
    description:
      "Product Team sync scheduled for tomorrow at 10:00 AM in Conference Room A.",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "New Feature Available",
    description:
      "Dark mode is now available! Enable it via your profile settings.",
    time: "Today, 9:15 AM",
  },
  {
    id: 4,
    title: "Security Alert",
    description:
      "New device login detected. If this wasn't you, please reset your password.",
    time: "2 hours ago",
  },
  {
    id: 5,
    title: "Task Completed",
    description: "All onboarding tasks completed. Great job!",
    time: "Yesterday",
  },
];

const archivedNotifications = [
  {
    id: 101,
    title: "Subscription Reminder",
    description:
      "Your premium plan expires in 3 days. Renew to keep your benefits.",
    time: "3 days ago",
  },
  {
    id: 102,
    title: "Leave Request Approved",
    description: "HR approved your leave request for next week.",
    time: "Last week",
  },
  {
    id: 103,
    title: "Password Changed",
    description: "Your account password was successfully changed 2 days ago.",
    time: "2 days ago",
  },
  {
    id: 104,
    title: "App Update",
    description:
      "Version 1.5.1 with bug fixes and performance improvements was released.",
    time: "Last week",
  },
];

export default function NotificationPanel() {
  const [showCards, setShowCards] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setShowCards(!showCards)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showCards ? "Hide Notifications" : "Show Notifications"}
      </button>

      {showCards && (
        <div className="space-y-4">
          {newNotifications.map((card) => (
            <div
              key={card.id}
              className="p-4 bg-white shadow rounded-lg border border-gray-300 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
              <p className="text-gray-600 mb-2">{card.description}</p>
              <span className="text-xs text-gray-400">{card.time}</span>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="space-y-4">
          {archivedNotifications.map((card) => (
            <div
              key={card.id}
              className="p-4 bg-white shadow rounded-lg border border-gray-300 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
              <p className="text-gray-600 mb-2">{card.description}</p>
              <span className="text-xs text-gray-400">{card.time}</span>
            </div>
          ))}
        </div>

        {/* Add below the card list */}
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={() => setShowCards(!showCards)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {showCards ? "Hide Notifications" : "Show Notifications"}
          </button>
          {showCards && (
            <p className="mt-3 text-gray-400 text-sm">No more notifications</p>
          )}
          <button className="mt-2 text-blue-500 hover:underline text-sm">
            Give Feedback
          </button>
          <div className="mt-4 text-xs text-gray-300">
            Last updated: 18 Sep 2025, 10:30 PM
          </div>
        </div>
      </div>
    </div>
  );
}
