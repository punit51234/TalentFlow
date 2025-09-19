import React from 'react';
import MetricCard from './elements/MetricCard';
import { LuFileCheck } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import { FaChartColumn } from "react-icons/fa6";

const metricData = [
  {
    label: "Active Jobs",
    value: 12,
    icon: <LuFileCheck className="w-8 h-8 text-blue-500" />,
    bg: "bg-blue-50"
  },
  {
    label: "Total Candidates",
    value: 247,
    icon: <FiCheckCircle className="w-8 h-8 text-green-500" />,
    bg: "bg-green-50"
  },
  {
    label: "Assessments",
    value: 8,
    icon: <BsPeople className="w-8 h-8 text-purple-500" />,
    bg: "bg-purple-50"
  },
  {
    label: "Hiring Rate",
    value: "12.3%",
    icon: <FaChartColumn className="w-8 h-8 text-yellow-500" />,
    bg: "bg-yellow-50"
  },
];

function AssessmentMatric() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 w-full">
      {metricData.map(data => (
        <MetricCard key={data.label} {...data} padding={3} />
      ))}
    </div>
  )
}

export default AssessmentMatric
