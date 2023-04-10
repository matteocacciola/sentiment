# Texts Sentiment Analysis

This method aims to provide a support for the analysis of the Sentiment a given list of texts.

## Usage
The usage is really simple
```typescript
import { textSentiment } from '@matteocacciola/sentiment'

const results: SentimentResult = await textSentiment(texts);
const results: SentimentResult = await textSentiment(texts, options);
```
where `texts` is an array of texts you want to analyze the Sentiment.

### Options
The `options` has the format `{ scoresEvaluator: ScoresEvaluator, scanPeriodDays: number; scoreThreshold: number; scoresEvaluatorOptions: ScoresEvaluatorOptions }`,
where:
- `scoresEvaluator` (default `'afinn'`) identifies the strategy to use for the evaluation of the scores and sentiments of the
  various collected data with `type ScoresEvaluatorStrategy = 'afinn' | 'google' | 'vader' | 'bayes'` (AFINN; Google Natural
  Language; VADER; Naive Bayes - default `'afinn'`). You can also pass a custom evaluator implementing the following type:
  ```typescript
  type EvaluateScoresFunction = (
    items: string[],
    scoreThreshold: number,
    scoresEvaluatorOptions?: ScoreStrategyOptions
  ) => Promise<ScoresEvaluatorResult[]>;
  ```
- `scoreThreshold` (default 0.3) identifies the "sentiment category" of a specific text. A number greater than 1 is
  automatically scaled to one. Loosely speaking, each "sentiment score" can range within the interval [-1, 1]:
  - when the score is within `[-1, -scoreThreshold]`, it is considered `negative`
  - when the score is within `]-scoreThreshold, scoreThreshold[`, it is labelled `neutral`
  - when the score is within `[scoreThreshold, 1]`, it is `positive`
  - finally, when no score can be retrieved, then the assigned category is `undefined`
- `scoresEvaluatorOptions`: if `scoresEvaluator` is `'google'`, you can set some options according to the [Google Cloud
  Natural Language API](https://cloud.google.com/natural-language/docs/reference/rest); if `scoresEvaluator` is `'bayes'`,
  you can set some preferences according to the [documentation of the Naive Bayes library](./libraries/naive-bayes.md#data).

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
  category?: SentimentType;
};

type SentimentType = 'positive' | 'negative' | 'neutral' | 'undefined';
```

## Notes
The available `scoresEvaluator` allows to use evaluations of Sentiment and scores by means of predefined strategies, already
implemented within this package, or by using a custom and self-implemented Sentiment classifier, e.g. obtained by
training suitable Machine Learning structures.
If you want to consult possible algorithms you can train, please feel free to be inspired by my
[Machine Learning codes](https://github.com/matteocacciola/challenges/tree/master/machine-learning/src) like Support
Vector Machines, Convolutional Neural Network, Multilayer Perceptron Artificial Neural Network, Fuzzy C-means and so forth.
