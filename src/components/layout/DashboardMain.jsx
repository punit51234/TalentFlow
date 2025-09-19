import React from 'react';
import Header from '../ui/Header';
import DashboardMetrics from '../ui/DashboardMetrics';
import RecentActivity from '../ui/RecentActivity';
import UrgentTasks from '../ui/UrgentTasks';
import ActivityTasksPanel from '../dashboard/ActivityTasksPanel';

function DashboardMain() {
  return (
    <div className=''>
      <Header path="/jobs/form" />
      <DashboardMetrics />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 px-4 mb-8 mt-8">
        <RecentActivity />
        <UrgentTasks />
      </div>
    </div>
  )
}

export default DashboardMain
