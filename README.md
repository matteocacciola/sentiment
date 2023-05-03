# Sentiment Analysis for Node.js

[![Coverage Status](https://coveralls.io/repos/github/matteocacciola/sentiment/badge.svg?branch=v1.4.1)](https://coveralls.io/github/matteocacciola/sentiment?branch=v1.4.1)

This library aims to provide a support for the analysis of texts, like the evaluation of Sentiment or Text Matching.
Please, consult the various methods here provided in order to have a wide overview of the possible features.

- [Media Sentiment Analysis](./docs/media-sentiment.md)
- [Texts Sentiment Analysis](./docs/texts-sentiment.md)
- [Texts Sentiment Analysis based on Keywords and Text Similarities](./docs/keywords-sentiment.md)
- [Text Matching based on Sentiment Analysis](./docs/text-matching.md)
- [Text Similarities](./docs/text-similarities.md)

## Installation
In order to install the library, please use
```
npm i @matteocacciola/sentiment
```

## Notes
The available methods allow to use evaluations of Sentiment and scores by means of predefined strategies, already
implemented within this package, or by using a custom and self-implemented Sentiment classifier, e.g. obtained by
training suitable Machine Learning structures.
If you want to consult possible algorithms you can train, please feel free to be inspired by my
[Machine Learning codes](https://github.com/matteocacciola/challenges/tree/master/machine-learning/src) like Support
Vector Machines, Convolutional Neural Network, Multilayer Perceptron Artificial Neural Network, Fuzzy C-means and so forth.
