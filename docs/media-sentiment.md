# Media Sentiment Analysis

This method aims to provide a support for the analysis of the Sentiment of a Company, Institution, Public Entity
or similar. This method analyses the most famous Social Media as well as source on Web in order to provide suitable information
about the Sentiment.

OpenAI ChatGPT is used to build a short qualitative summary from the obtained information. Quantitative information
related to the Sentiment are evaluated according to specific sources of truth (i.e., Google Natural Language,
VADER, AFINN-based, Naive Bayes algorithms, or alternatively a custom one), which can be configured to your liking.

## Usage
The usage is really simple
```typescript
import { mediaSentiment } from '@matteocacciola/sentiment'

const results: Record<string, SentimentAnalysisResult | null>[] = await mediaSentiment('yourCompany', media, configuration);
const results: Record<string, SentimentAnalysisResult | null>[] = await mediaSentiment('yourCompany', media, configuration, options);
```
This method is fully configurable.

### Media
The `media` parameter is an array listing all the source media you wish to use for the evaluation of the
Sentiment. As explained in the [Usage](#usage), you can list here one or more sources among `'facebook'`, `'instagram'`,
`'news'`, `'tiktok'`, `'twitter'`, `'youtube'`.

### Configuration
The `configuration` parameter has some mandatory and some optional elements. Configuration for OpenAI API is mandatory.
It is used to have a qualitative summary of the sentiments retrieved from the media information.
```typescript
configuration = { openai: { apiKey: 'theOpenAIApiKey' } };
```
Please, follow the instructions from the [official documentation](https://platform.openai.com/account/api-keys)
in order to create an API key.
In addition to the `openai` attribute and according to the `media` you want to use, you can set more elements in `configuration`:
```typescript
configuration = {
  facebook: { accessToken: 'theFacebookAccessToken' },
  instagram: { accessToken: 'theInstagramAccessToken' },
  news: { apiKey: 'theNewsApiKey' },
  tiktok: { accessToken: 'theTikTokAccessToken', videos: theNumberOfVideosToConsider ?? 200 },
  twitter: {
    appKey: 'theTwitterAppKey',
    appSecret: 'theTwitterAppSecret',
    accessToken: 'theTwitterAccessToken',
    accessSecret: 'theTwitterAccessSecret',
    tweets: theNumberOfTweetsToConsider ?? 100,
  },
  youtube: {
    apiKey: 'theYouTubeAppKey',
    videos: theNumberOfVideosToConsider ?? 100,
    comments: theNumberOfCommentsPerVideoToConsider ?? 100,
  },
};
```

#### Facebook
Please, consider this library uses the `/search` endpoint to retrieve posts. Therefore, you need an app tied to a
Facebook's Workplace account. Please, consult the [official documentation](https://developers.facebook.com/docs/graph-api/)
in order to obtain the proper access token for the `configuration`.

#### Instagram
Similarly to [Facebook](#facebook), you need to set an access token in `configuration`, if you want to use this media as
source of your sentiment analysis. In this case, the `/media` endpoint is used. Please, refer to
[official documentation](https://developers.facebook.com/docs/instagram) for more information.

#### News API
[News API](https://newsapi.org/) is an innovative service used to retrieve the information about the Sentiment from the
Web pages. Please, use the link above in order to obtain an API key to set into the `configuration` parameter.

#### TikTok
Even TikTok can be used to retrieve information about the sentiment. This library uses the `v1` API, specifically the
`/search` endpoint, to retrieve suitable data. Please, paste your access token within the `configuration` parameter.
Official documentation available [here](https://developers.tiktok.com/doc/overview/).

#### Twitter
If you want to use Twitter as media, `config` parameter requires some settings to be used, representing the app key,
app secret, access token and access token secret, respectively. You can consult the
[official documentation](https://developer.twitter.com/en/docs/twitter-api) for more details.

#### YouTube
In order to use YouTube as well, you need to set your API key to the `configuration` parameter.
Please, login to the [Google Developers Console](https://console.cloud.google.com/apis/dashboard) for more details.

### Options
The `options` has the format `{ scoresEvaluator: ScoresEvaluator; scanPeriodDays: number; scoreThreshold: number; scoresEvaluatorOptions: ScoresEvaluatorOptions }`,
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
- `scanPeriodDays` represents the number of days to use to collect Sentiment evaluation data (default 7)
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
Keys of `results` can be one of `'facebook'`, `'instagram'`, `'news'`, `'tiktok'`, `'twitter'`, `'youtube'`, whereas
`SentimentAnalysisResult` has the format:
```typescript
type SentimentAnalysisResult = {
  positive: number;
  negative: number;
  neutral: number;
  analyzedElements: Score[];
  summary?: string | null;
  timeRange: {
    from: string;
    to: string;
  };
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
