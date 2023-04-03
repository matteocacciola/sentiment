import { Corpus } from './corpus';
import { Classifier } from './classifier';

export const bayesSentiment = (text: string, positivePath?: string, negativePath?: string) => {
  const positiveCorpus = new Corpus();
  const negativeCorpus = new Corpus();

  if (!positivePath) positivePath = __dirname + '/data/positive';
  if (!negativePath) negativePath = __dirname + '/data/negative';

  positiveCorpus.loadFromDirectory(positivePath);
  negativeCorpus.loadFromDirectory(negativePath);

  return new Classifier(positiveCorpus, negativeCorpus).classify(text);
};
