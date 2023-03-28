import axios from 'axios';

export namespace Axios {
  export const get = async <T = any>(url: string, params: any): Promise<T> => {
    const { data } = await axios.get(url, { params });
    return data;
  };
}
