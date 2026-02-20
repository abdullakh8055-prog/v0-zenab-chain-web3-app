// In-memory database for storing EIS submissions
// In production, replace this with a real database like Neon PostgreSQL

export interface EISSubmission {
  id: string;
  co2: number;
  pm25: number;
  pm10: number;
  eis: number;
  status: 'saved' | 'denied';
  timestamp: Date;
  txId?: string;
}

// In-memory storage
let submissions: EISSubmission[] = [];

export const db = {
  // Add a new submission
  addSubmission(co2: number, pm25: number, pm10: number, eis: number, status: 'saved' | 'denied', txId?: string): EISSubmission {
    const submission: EISSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      co2,
      pm25,
      pm10,
      eis,
      status,
      timestamp: new Date(),
      txId,
    };
    submissions.push(submission);
    return submission;
  },

  // Get all submissions
  getSubmissions(): EISSubmission[] {
    return submissions;
  },

  // Get statistics
  getStats() {
    const total = submissions.length;
    const verified = submissions.filter(s => s.status === 'denied').length; // Denied means it was above 80 threshold
    const avgEIS = total > 0 ? submissions.reduce((sum, s) => sum + s.eis, 0) / total : 0;

    return {
      totalRecords: total,
      verifiedCount: verified,
      avgEIS: Math.round(avgEIS * 100) / 100,
    };
  },

  // Clear all submissions (for testing)
  clear() {
    submissions = [];
  },
};
