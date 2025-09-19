import { create } from "zustand";

const useAppStore = create((set) => ({

  jobs: [],
  setJobs: (jobs) => set({ jobs }),

  candidates: [],
  setCandidates: (candidates) => set({ candidates }),

  assessments: [],
  setAssessments: (assessments) => set({ assessments }),

   addAssessment: (assessment) =>
    set((state) => ({ assessments: [assessment, ...state.assessments] })),
  
  updateAssessment: (updated) =>
    set((state) => ({
      assessments: state.assessments.map((data) =>
        data.id === updated.id ? updated : data
      )
    })),


  page: 1,
  perPage: 10,
  setPage: (page) => set({ page }),
  setPerPage: (perPage) => set({ perPage, page: 1 }),
}));

export default useAppStore;