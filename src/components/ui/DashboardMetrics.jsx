import React from "react";
import useAppStore from "../../store/useAppStore";
import MetricCard from "./elements/MetricCard";
import { FiBriefcase, FiUsers, FiFileText, FiTrendingUp } from "react-icons/fi";

export default function DashboardMetrics() {
  const jobs = useAppStore((state) => state.jobs);
  const assessments = useAppStore((state) => state.assessments);
  const candidates = useAppStore((state) => state.candidates);

  const metricData = [
    {
      label: "Active Jobs",
      value: jobs.length,
      change: "+2 this week",
      icon: <FiBriefcase className="w-8 h-8 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Candidates",
      value: candidates.length,
      change: "+18 this week",
      icon: <FiUsers className="w-8 h-8 text-green-500" />,
      bg: "bg-green-50",
    },
    {
      label: "Assessments",
      value: assessments.length,
      change: "+1 this week",
      icon: <FiFileText className="w-8 h-8 text-purple-500" />,
      bg: "bg-purple-50",
    },
    {
      label: "Hiring Rate",
      value: "12.3%",
      change: "+2.1% this month",
      icon: <FiTrendingUp className="w-8 h-8 text-yellow-500" />,
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 w-full">
      {metricData.map((data) => (
        <MetricCard key={data.label} {...data} />
      ))}
    </div>
  );
}
