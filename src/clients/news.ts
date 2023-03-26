import { NEWS } from '../constants';
import { Axios } from '../utils/axios';
import { DateRange } from '../types';

export namespace NewsClient {
  type NewsApiResponse = {
    status: string;
    totalResults: number;
    articles: {
      title: string;
      description: string;
      url: string;
    }[];
  }

  const baseUrl = 'https://newsapi.org/v2/everything';
  const apiKey = NEWS.API_KEY;

  export const getNews = async (company: string, { since, until }: DateRange): Promise<string[]> => {
    const { articles } = await Axios.get<NewsApiResponse>(baseUrl, {
      q: company,
      apiKey,
      from: since,
      to: until,
    });

    return articles.map((article) => `${article.title} ${article.description}`);
  };
}
