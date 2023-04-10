# Text matching

This method aims to provide a text matching, based on configurable algorithms to compare descriptive text with a list
of provided texts and calculate degree of match.

If a provided text matches one of the `sources`, the function increments the corresponding counter (`overallMatch`,
`positiveMatch`, or `negativeMatch`) and determines whether the token matches a positive or negative word.
The tokens in the `sources` are evaluated according to the analysis of Sentiment.

Therefore, you could use this code to calculate how closely a given text matches a list of descriptive texts, like
reviews, and then choose the element that best matches. For instance, it could be used to select a list of restaurants,
given a number of reviews in `sources` and a description of the restaurant you want to find like.

## Usage
The usage is really simple
```typescript
import { textMatching } from '@matteocacciola/sentiment'

const result: MatchedAttributes = textMatching('yourText', sources);
const result: MatchedAttributes = textMatching('yourText', sources, options);
```
where `sources` identifies the array of elements to match with. Each source has the format:
```typescript
type DescriptiveSource = {
  text: string;
  rating: number;
}
```
with `rating` from 1 to 5.

### Options
`options` has the format `{ strategy: StrategyType, scoreThreshold: number; }`, where
- `strategy`(default `afinn`) identifies the strategy to use for the evaluation of the scores and sentiments of the
  various collected data with `type StrategyType = 'afinn' | 'google' | 'vader' | 'bayes'`: AFINN; Google Natural
  Language; VADER; Naive Bayes (default `'afinn'`).
- `scoreThreshold` (default 0.3) identifies the "sentiment category" of a specific text. Loosely speaking, each
  "sentiment score" can range within the interval [-1, 1]:
  - when the score is within `[-1, -scoreThreshold]`, it is considered `negative`
  - when the score is within `[-scoreThreshold, scoreThreshold]`, it is labelled `neutral`
  - when the score is within `[scoreThreshold, 1]`, it is `positive`
  - finally, when no score can be retrieved, then the assigned category is `undefined`.

  A number greater than 1 is automatically scaled to one.

### Result
The result has the following format:
```typescript
type MatchedAttributes = {
  overallMatch: number;
  positiveMatch: number;
  negativeMatch: number;
}
```
where:
- `overallMatch` is the total number of descriptive text tokens appearing in the provided text
- `positiveMatch` is the total number of positive tokens (like "delicious", "excellent", "awesome", etc.) of the provided
text appearing in the `sources`
- `negativeMatch` is the total number of negative tokens (like "bad", "terrible", "disappointing", etc.) of the provided
text appearing in the `sources`.
