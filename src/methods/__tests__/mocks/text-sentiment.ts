import { expect } from 'vitest';

export const mockedGetAnalysisResultsResolved = {
  sentimentStats: { positive: 2, negative: 1, neutral: 1 },
  scores: [{ score: 0.5 }, { score: -0.2 }, { score: 0 }, { score: 0.2 }],
};

export const mockedTextSentimentResult = {
  sentimentStats: { positive: 2, negative: 1, neutral: 1 },
  analyzedElements: [{ score: 0.5 }, { score: -0.2 }, { score: 0 }, { score: 0.2 }],
  sentimentScore: 0.25,
  analyzedAt: expect.any(String),
};
