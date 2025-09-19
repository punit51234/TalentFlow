import React, { useEffect} from "react";
import AppLayout from "./components/layout/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Job from "./components/layout/Job";
import Candidate from "./components/layout/Candidate";
import Assessment from "./components/layout/Assessment";
import DashboardMain from "./components/layout/DashboardMain";
import "./App.css";
import JobForm from "./components/forms/JobForm";
import AssessmentForm from "./components/forms/AssessmentForm";
import AssessmentView from "./components/ui/AssessmentView";
import CandidateExpandedView from "./components/layout/CandidateExpandedView";
import NotificationPanel from "./components/layout/NotificationPanel";
import useAppStore from "./store/useAppStore";
import { jobData } from "./seed/jobs";
import { candidateData } from "./seed/candidate";
import { assessmentData } from "./seed/assessment";





const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardMain /> },
      { path: "jobs", element: <Job /> },
      { path: "jobs/form", element: <JobForm /> },
      { path: "candidates", element: <Candidate /> },
      { path: "candidates/view", element: <CandidateExpandedView /> },
      { path: "assessments", element: <Assessment /> },
      { path: "assessments/form", element: <AssessmentForm /> },
      { path: "assessments/view", element: <AssessmentView /> },
      { path: "notification", element: <NotificationPanel /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {

  const initializedJob = React.useRef(false);
  const initializedAssessment = React.useRef(false);
  const initializedCandidate = React.useRef(false);
  const jobs = useAppStore((state) => state.jobs);
  const setJobs = useAppStore((state) => state.setJobs);
  const assessments = useAppStore((state) => state.assessments);
  const setAssessments = useAppStore((state) => state.setAssessments);
  const candidates = useAppStore((state) => state.candidates);
  const setCandidates = useAppStore((state) => state.setCandidates);


    useEffect(() => {
      if (!initializedJob.current && jobs.length === 0) {
        setJobs(jobData);
        initializedJob.current = true;
      }
    }, [setJobs, jobs.length]);


  useEffect(() => {
    if (!initializedAssessment.current && assessments.length === 0) {
      setAssessments(assessmentData);
      initializedAssessment.current = true;
    }
  }, [setAssessments, assessments.length]);


  useEffect(() => {
    if (!initializedCandidate.current && candidates.length === 0) {
      setCandidates(candidateData);
      initializedCandidate.current = true;
    }
  }, [setCandidates, candidates.length]);




  return (
    <>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </>
  );
}

export default App;
