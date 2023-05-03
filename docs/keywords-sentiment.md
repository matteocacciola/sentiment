# Texts Sentiment Analysis based on Keywords and Text Similarities

This method aims to provide a different approach to the Sentiment Analysis. The provided texts will be divided in
sentences. Then, the sentences will be grouped according to similarities. A Natural Language based Universal Sentence Encoder
is used to group similar sentences. Then, Term Frequency–Inverse Document Frequency (tf-idf) is implemented in order to
extract relevant keywords from groups.

In this way, keywords are analyzed by a Natural Computation based algorithm in order to extract the Sentiments. Finally,
these are collected and a weighted average, with number of keywords as weight, is provided as the final Sentiment score.

## Usage
The usage is really simple
```typescript
import { keywordsSentiment } from '@matteocacciola/sentiment'

const results: SentimentResult = await keywordsSentiment(texts);
const results: SentimentResult = await keywordsSentiment(texts, options);
```
where `texts` is an array of texts you want to analyze the Sentiment.

### Options
The `options` has the format `{ scoreThreshold: number; similarityThreshold: number }`,
where:
- `scoreThreshold` (default 0.3) identifies the "sentiment category" of a specific text. A number greater than 1 is
  automatically scaled to one. Loosely speaking, each "sentiment score" can range within the interval [-1, 1]:
  - when the score is within `[-1, -scoreThreshold]`, it is considered `negative`
  - when the score is within `]-scoreThreshold, scoreThreshold[`, it is labelled `neutral`
  - when the score is within `[scoreThreshold, 1]`, it is `positive`
  - finally, when no score can be retrieved, then the assigned category is `undefined`
- `similarityThreshold` (default 0.5) sets the threshold used to filter the similarities among sentences composing a text.

### Result
It has the format:
```typescript
type SentimentResult = {
  positive: number;
  negative: number;
  neutral: number;
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
