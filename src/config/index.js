export const getUrl = (path) => import.meta.env.VITE_API_BASE_URL + path;

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  apis: {
    movies: getUrl('/media/movies/list'),
    series: getUrl('/media/series/list'),
    movieSeries: getUrl('/media/movie-series/list'),
    json: getUrl('/media/json'),
  },
}; 
