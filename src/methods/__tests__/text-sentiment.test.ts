import { expect, describe, it, vitest, beforeEach, SpyInstance } from 'vitest';
import * as getAnalysisStats from '../../strategies/helpers/getAnalysisStats';
import { textSentiment } from '../text-sentiment';
import { mockedGetAnalysisResultsResolved, mockedTextSentimentResult } from './mocks/text-sentiment';

const mockedGetAnalysisResults: SpyInstance = vitest.spyOn(getAnalysisStats, 'getAnalysisStats');

beforeEach(() => {
  vitest.clearAllMocks();
});

describe('textSentiment', () => {
  it('returns null when getAnalysisStats returns null', async () => {
    mockedGetAnalysisResults.mockResolvedValueOnce(null);

    const result = await textSentiment(['some text'], { strategy: 'afinn' });

    expect(mockedGetAnalysisResults).toHaveBeenCalledOnce();
    expect(mockedGetAnalysisResults).toHaveBeenCalledWith(['some text'], 'afinn', 0.3, undefined);
    expect(result).toBeNull();
  });

  it('calculates the sentiment score when getAnalysisStats returns a result, without strategy options', async () => {
    mockedGetAnalysisResults.mockResolvedValueOnce(mockedGetAnalysisResultsResolved);

    const result = await textSentiment(['some text']);

    expect(mockedGetAnalysisResults).toHaveBeenCalledOnce();
    expect(mockedGetAnalysisResults).toHaveBeenCalledWith(['some text'], 'afinn', 0.3, undefined);
    expect(result).toEqual(mockedTextSentimentResult);
  });

  it('calculates the sentiment score when getAnalysisStats returns a result, with a score threshold > 1', async () => {
    mockedGetAnalysisResults.mockResolvedValueOnce(mockedGetAnalysisResultsResolved);

    const result = await textSentiment(['some text'], { scoreThreshold: 2 });

    expect(mockedGetAnalysisResults).toHaveBeenCalledOnce();
    expect(mockedGetAnalysisResults).toHaveBeenCalledWith(['some text'], 'afinn', 1, undefined);
    expect(result).toEqual(mockedTextSentimentResult);
  });

  it('calculates the sentiment score when getAnalysisStats returns a result', async () => {
    mockedGetAnalysisResults.mockResolvedValueOnce(mockedGetAnalysisResultsResolved);

    const result = await textSentiment(['some text'], { strategy: 'vader' });

    expect(mockedGetAnalysisResults).toHaveBeenCalledOnce();
    expect(mockedGetAnalysisResults).toHaveBeenCalledWith(['some text'], 'vader', 0.3, undefined);
    expect(result).toEqual(mockedTextSentimentResult);
  });
});
