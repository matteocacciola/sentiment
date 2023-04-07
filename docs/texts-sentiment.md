# Texts Sentiment Analysis

This method aims to provide a support for the analysis of the Sentiment a given list of texts.

## Usage
The usage is really simple
```typescript
import { sentiment } from '@matteocacciola/sentiment'

const results: SentimentResult = textSentiment(texts);
const results: SentimentResult = textsentiment(texts, options);
```

### Options
The `options` has the format `{ strategy: StrategyType, scoreThreshold: number; strategyOptions: ScoreStrategyOptions }`,
where:

- `strategy`(default `'afinn'`) identifies the strategy to use for the evaluation of the scores and sentiments of the
  various collected data with `type StrategyType = 'afinn' | 'google' | 'vader' | 'bayes'`: AFINN; Google Natural
  Language; VADER; Naive Bayes (default `'afinn'`).
- `scoreThreshold` (default 0.3) identifies the "sentiment category" of a specific text. A number greater than 1 is
  automatically scaled to one. Loosely speaking, each "sentiment score" can range within the interval [-1, 1]:
  - when the score is within `[-1, -scoreThreshold]`, it is considered `negative`
  - when the score is within `]-scoreThreshold, scoreThreshold[`, it is labelled `neutral`
  - when the score is within `[scoreThreshold, 1]`, it is `positive`
  - finally, when no score can be retrieved, then the assigned category is `undefined`
- `strategyOptions`: if `strategy` is `'google'`, you can set some options according to the [Google Cloud Natural Language
  API](https://cloud.google.com/natural-language/docs/reference/rest); if `strategy` is `'bayes'`, you can set some preferences
  according to the [documentation of the Naive Bayes library](./libraries/naive-bayes.md#data).

### Result
It has the format:
```typescript
type SentimentResult = {
  positive: number;
  negative: number;
  neutral: number;
  undefined: number;
  analyzedElements: Score[];
  sentimentScore: number;
  analyzedAt: string;
};

type Score = {
  text: string;
  score?: number;
  category?: SentimentsType;
};

type SentimentsType = 'positive' | 'negative' | 'neutral' | 'undefined';
```
