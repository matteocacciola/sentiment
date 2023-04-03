export const stopWords = (): string[] => {
  return ('a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,' +
    'cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,' +
    'however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,' +
    'off,often,on,only,or,other,our,own,rather,really,said,say,says,she,should,since,so,some,than,that,the,their,' +
    'them,then,there,these,they,this,tis,to,too,totally,twas,us,wants,was,we,were,what,when,where,which,while,who,' +
    'whom,why,will,with,would,yet,you,your').split(',');
};

export const getWords = (input: any): string[] => {
  const filtered = input.toString().replace(/[^0-9a-zA-Z ]/g, '');

  return filtered.split(' ').map((word: string) => word.trim().toLowerCase())
    .filter((word: string) => word.length > 0);
};
