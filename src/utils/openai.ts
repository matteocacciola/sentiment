import { OpenAIApi, Configuration } from 'openai';
import { MEDIA, MediaType } from '../types';
import { OpenAiClientType } from '../clients/types';

export namespace OpenAI {
  export const getSummary = async (
    { apiKey }: OpenAiClientType,
    company: string,
    media: MediaType,
    elements: string[],
  ): Promise<string | undefined> => {
    const configuration = new Configuration({ apiKey });
    const client = new OpenAIApi(configuration);

    if (!elements.length) {
      return undefined;
    }

    const prompt = `Analyze the sentiment for ${company} on ${MEDIA[media]} based on the comments:\n\n${elements.join(
      '\n',
    )}\n\n`;
    const { data } = await client.createCompletion({
      model: 'text-davinci-003',
      prompt,
      n: 1,
      stop: ['\n\n'],
    });

    return data.choices[0].text?.trim();
  };
}
