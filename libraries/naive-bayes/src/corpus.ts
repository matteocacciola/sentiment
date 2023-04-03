import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { eachWord } from './document';

export class Corpus {
  private readonly tokens: { [x: string]: number; };
  private total: number;

  constructor() {
    this.tokens = {};
    this.total = 0;
  }

  private add(content: any): void {
    eachWord(content, (word: string) => {
      this.tokens[word] = (this.tokens[word] || 0) + 1;
    });
  };

  public loadFromDirectory(directory: string) {
    readdirSync(directory).forEach((file) => {
      const fileData = readFileSync(join(directory, file), 'utf-8');
      fileData.split('\n').forEach((line) => this.add(line));
    });

    this.totalTokens = Object.values(this.tokens).reduce((acc, item) => acc + item, 0);
  };

  public tokenCount(word: string) {
    return this.tokens[word] || 0;
  };

  get totalTokens(): number {
    return this.total;
  }

  set totalTokens(num: number) {
    this.total = num;
  }
}
