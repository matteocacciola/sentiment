import { eachWord } from './document';
import { stopWords } from './helpers';
import { Corpus } from './corpus';

export class Classifier {
  private positiveCorpus: Corpus;
  private negativeCorpus: Corpus;
  private totalProbability: number;
  private inverseTotalProbability: number;
  private tolerance: number;

  constructor(positiveCorpus: Corpus, negativeCorpus: Corpus) {
    this.positiveCorpus = positiveCorpus;
    this.negativeCorpus = negativeCorpus;

    this.totalProbability = 0;
    this.inverseTotalProbability = 0;
    this.tolerance = 0.05;
  }

  public classify(text: string) {
    eachWord(text, (word: string) => {
      if (stopWords().includes(word)) return;

      this.recordProbability(
        this.calculateProbability(this.positiveCorpus.tokenCount(word), this.negativeCorpus.tokenCount(word)),
      );
    });

    const finalProbability = this.combineProbabilities();

    return {
      sentiment: this.computeSentiment(finalProbability),
      probability: finalProbability,
    };
  };

  private calculateProbability(positiveMatches: number, negativeMatches: number) {
    const unknownWordStrength = 1.0;
    const unknownWordProbability = 0.5;

    const total = positiveMatches + negativeMatches;
    const positiveRatio = positiveMatches / this.positiveCorpus.totalTokens;
    const negativeRatio = negativeMatches / this.negativeCorpus.totalTokens;

    const probability = positiveRatio / (positiveRatio + negativeRatio);

    return ((unknownWordStrength * unknownWordProbability) + (total * probability)) / (unknownWordStrength + total);
  };

  private recordProbability(probability: number): void {
    if (isNaN(probability)) return;

    this.totalProbability = (this.totalProbability === 0) ? probability : this.totalProbability * probability;
    this.inverseTotalProbability = (this.inverseTotalProbability === 0)
      ? (1 - probability)
      : this.inverseTotalProbability * (1 - probability);
  };

  private combineProbabilities(): number {
    if (this.totalProbability === 0) return 0.5;

    return this.totalProbability / (this.totalProbability + this.inverseTotalProbability);
  };

  private computeSentiment(probability: number): string {
    if (probability <= (0.5 - this.tolerance)) return 'negative';
    if (probability >= (0.5 + this.tolerance)) return 'positive';
    return 'neutral';
  };
}
