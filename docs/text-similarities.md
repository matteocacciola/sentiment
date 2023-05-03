# Text Similarities

This method uses Natural Language based Universal Sentence Encoder to group similar sentences in a text.

## Usage
The usage is really simple
```typescript
import { textSimilarities } from '@matteocacciola/sentiment'

const results: string[][] = await textSimilarities(text);
const results: string[][] = await textSimilarities(text, similarityThreshold);
```
where `text` is the string you want to inspect.

### Options
The `similarityThreshold` (default 0.5) sets the threshold used to filter the similarities among sentences composing a text.

### Result
It is an array where each element is a group of similar sentences.
