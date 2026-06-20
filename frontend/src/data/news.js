import news from './news.json';

export const getMockNewsData = (id) => {
  return news.articles.find(a => a.id === id) || news.articles[0];
};

export const getRelatedArticles = (currentId) => {
  return news.related.filter(a => a.id !== currentId).slice(0, 3);
};
