# Sentiment Analysis for Node.js
This library aims to provide a support for the analysis of the Sentiment of a Company, Institution, Public Entity
or similar.

This package analyses the most famous Social Media as well as source on Web in order to provide suitable information
about the Sentiment.

OpenAI ChatGPT is used to build a short qualitative summary from the obtained information. Quantitative information
related to the Sentiment are evaluated according to specific sources of truth (i.e., one among Google Natural Language,
VADER or AFINN-based algorithms), which can be configured to your liking.

## Installation
In order to install the library, please use
```
npm i @matteocacciola/sentiment-analysis
```

## Usage
The usage is really simple
```typescript
import { sentiment } from '@matteocacciola/sentiment-analysis'

const results: Record<string, SentimentAnalysisResult | null>[] =
  sentiment('yourCompany');
```
Keys of `results` can be one of `facebook`, `instagram`, `news`, `tiktok`, `twitter`, `youtube`,
whereas `SentimentAnalysisResult` has the format:
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
  category?: SentimentsType;
};

type SentimentsType = 'positive' | 'negative' | 'neutral' | 'undefined';
```
The package is fully configurable.

## Configuration
You can use environment variables to configure the library.

### Package configuration

#### SENTIMENT_MEDIA_ENABLED
This configuration key is a comma-separated value listing all the source media you wish to use for the evaluation of the
Sentiment. As explained in the [Usage](#usage), you can list here one or more sources among `facebook`, `instagram`,
`news`, `tiktok`, `twitter`, `youtube`.

**This configuration key is mandatory**. Example:
```dotenv
SENTIMENT_MEDIA_ENABLED='facebook,twitter,tiktok'
```

#### SENTIMENT_SCAN_PERIOD_DAYS
This configuration key is used to set the spanning period of data collection. It represents the number of days to use
to collect Sentiment evaluation data.

**Default is 7**. Example:
```dotenv
SENTIMENT_SCAN_PERIOD_DAYS=7
```

#### SENTIMENT_STRATEGY_PROVIDER
This key identifies the strategy to use for the evaluation of the scores and sentiments of the various collected data.
As mentioned in the [Introduction](#sentiment-analysis-for-nodejs), it can be one among Google Natural Language,
VADER or AFINN-based algorithms, identified by `google`, `vader` or `afinn` respectively.

**The default value is `afinn`**, which is even used when an invalid value is assigned to this key. Example:
```dotenv
SENTIMENT_STRATEGY_PROVIDER=afinn
```

#### SENTIMENT_PROCESS_THRESHOLD
This is the threshold to use in order to identify the "sentiment category" of a specific text. Loosely speaking, each
"sentiment score" can range within the interval [-1, 1].

When the score is within [-1, -SENTIMENT_PROCESS_THRESHOLD], it
is considered `negative`.
When the score is within `[-SENTIMENT_PROCESS_THRESHOLD, SENTIMENT_PROCESS_THRESHOLD]`, it is
labelled `neutral`.
When the score is within `[SENTIMENT_PROCESS_THRESHOLD, 1]`, it is `positive`.
Finally, when no score can be retrieved, then the assigned category is `undefined`.

A number greater than 1 is automatically scaled to one.

**Default value is 0.3**. Example:
```dotenv
SENTIMENT_PROCESS_THRESHOLD=0.3
```

#### SENTIMENT_TWITTER_TWEET_COUNT
In case you want to use Twitter as one of your media to collect information about the Sentiment, this key can be used
to set the number of tweets to retrieve in the spanned time range. The tweets are ordered by the descending number of
interactions.

**Default is 100**. Example:
```dotenv
SENTIMENT_TWITTER_TWEET_COUNT=100
```

#### SENTIMENT_YOUTUBE_VIDEO_COUNT
In case you want to use Youtube as one of your media to collect information about the Sentiment, this key can be used
to set the number of videos to retrieve in the spanned time range. The videos are ordered by the descending number of
interactions.

**Default is 100**. Example:
```dotenv
SENTIMENT_YOUTUBE_VIDEO_COUNT=100
```

#### SENTIMENT_YOUTUBE_COMMENTS_PER_VIDEO_COUNT
Together with [SENTIMENT_YOUTUBE_VIDEO_COUNT](#sentimentyoutubevideocount), you can use this key to establish the
number of comments per video to retrieve. The comments are ordered by the descending number of interactions.

**Default is 100**. Example:
```dotenv
SENTIMENT_YOUTUBE_COMMENTS_PER_VIDEO_COUNT=100
```

#### SENTIMENT_TIKTOK_VIDEO_COUNT
Similarly to [Youtube](#sentimentyoutubevideocount), this key can be used with TikTok in order to set the number of videos
used to retrieve the available information (i.e., captions) to evaluate the Sentiment. The videos are ordered by the
descending number of interactions.

**Default is 200**. Example:
```dotenv
SENTIMENT_TIKTOK_VIDEO_COUNT=200
```

### OpenAI Configuration
OpenAI API key is used to have a qualitative summary of the sentiments retrieved from the media information. Please,
follow the instructions from the [official documentation](https://platform.openai.com/account/api-keys) in order to
create an API key, and store it within the environment variable named `OPENAI_API_KEY`.

### Media source configuration
The different media sources you want to use should be properly configured. Please, follow the instructions below.

#### Facebook
You have to set a proper `FACEBOOK_ACCESS_TOKEN` able to host the access token for the GraphQL queries.

Please, consider this library uses the `/search` endpoint to retrieve posts. Therefore, you need an app tied to a
Facebook's Workplace account. Please, consult the [official documentation](https://developers.facebook.com/docs/graph-api/).

#### Instagram
Similarly to [Facebook](#facebook), you need to set an access token to the environment variable `INSTAGRAM_ACCESS_TOKEN`.

In this case, the `/media` endpoint is used. Please, refer to [official documentation](https://developers.facebook.com/docs/instagram)
for more information.

#### News API
[News API](https://newsapi.org/) is an innovative service used to retrieve the information about the Sentiment from the
Web pages.

Please, use the link above in order to otain an API key, which you will then copy and paste to `NEWS_API_KEY`.

#### TikTok
Even TikTok can be used to retrieve information about the sentiment. This library uses the `v1` API, specifically the
`/search` endpoint, to retrieve suitable data.

Please, paste your access token to the `TIKTOK_ACCESS_TOKEN` environment
variable. Official documentation available [here](https://developers.tiktok.com/doc/overview/).

#### Twitter
Twitter requires some settings to be used.

Specifically: `TWITTER_APP_KEY`, `TWITTER_APP_SECRET`, `TWITTER_ACCESS_TOKEN`,
`TWITTER_ACCESS_TOKEN_SECRET`, representing the app key, app secret, access token and access token secret, respectively.

You can consult the [official documentation](https://developer.twitter.com/en/docs/twitter-api) for more details.

#### Youtube
In order to use Youtube as well, you need to set your API key to the `YOUTUBE_API_KEY` environment variables.

Please, login to the [Google Developers Console](https://console.cloud.google.com/apis/dashboard) for more details.
