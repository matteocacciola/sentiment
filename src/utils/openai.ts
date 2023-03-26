import { OpenAIApi, Configuration } from 'openai';
import { MEDIA, MediaType } from '../types';
import { OPENAI } from '../constants';

export namespace OpenGPT {
  export class OpenAIObj {
    private client: OpenAIApi;

    constructor() {
      const configuration = new Configuration({
        apiKey: OPENAI.API_KEY,
      });
      this.client = new OpenAIApi(configuration);
    }

    public getSummary = async (company: string, media: MediaType, elements: string[]): Promise<string | undefined> => {
      if (!elements.length) {
        return undefined;
      }

      const prompt = `Analyze the sentiment for ${company} on ${MEDIA[media]} based on the comments:\n\n${elements.join(
        '\n',
      )}\n\n`;
      const { data } = await this.client.createCompletion({
        model: 'text-davinci-003',
        prompt,
        n: 1,
        stop: ['\n\n'],
      });

      return data.choices[0].text?.trim();
    };
  }
}
