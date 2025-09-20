// src/api/mirage/startMirage.js
import { createServer } from "miragejs";
import { jobData } from "../../seed/jobs";
import { candidateData } from "../../seed/candidate";
import { assessmentData } from "../../seed/assessment";

export function startMirage() {
  // Prevent Mirage from starting twice in hot-reload / preview
  if (window.__mirage) return;

  createServer({
    routes() {
      this.namespace = "/api"; // all routes will be /api/...

      /* ------------------- JOBS ------------------- */
      this.get("/jobs", () => {
        return { items: jobData, meta: { total: jobData.length } };
      });

      /* ----------------- CANDIDATES ---------------- */
      this.get("/candidates", () => {
        return { items: candidateData, meta: { total: candidateData.length } };
      });

      this.get("/candidates/:id", (schema, request) => {
        let id = request.params.id;
        let candidate = candidateData.find((c) => String(c.id) === id);
        return candidate || {};
      });

      /* ----------------- ASSESSMENTS ---------------- */
      this.get("/assessments", () => {
        return { items: assessmentData, meta: { total: assessmentData.length } };
      });

      this.get("/assessments/:id", (schema, request) => {
        let id = request.params.id;
        let assessment = assessmentData.find((a) => String(a.id) === id);
        return assessment || {};
      });
    },
  });

  window.__mirage = true;
}
