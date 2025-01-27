export const getUrl = (path) => import.meta.env.VITE_API_BASE_URL + path;

export const config = Object.freeze({
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
	apis: {
		movies: getUrl("/media/movies/list"),
		series: getUrl("/media/series/list"),
		movieSeries: getUrl("/media/movie-series/list"),
		json: getUrl("/media/json"),
		downloadJobs: getUrl("/media/download-jobs"),
		downloadsDirectory: getUrl("/media/downloads/list"),
	},
});

const makeNavLink = (name, path, iconClass) => ({ name, path, iconClass });
export const navConfig = Object.freeze([
	makeNavLink("Movies", "/", "bi-film"),
	makeNavLink("Movie Series", "/movie-series", "bi-collection-play"),
	makeNavLink("Series", "/series", "bi-tv"),
	makeNavLink("Settings", "/settings", "bi-gear"),
	makeNavLink("Downloads", "/downloads-jobs", "bi-cloud-download"),
	makeNavLink("Files", "/downloads-directory", "bi-folder"),
]);
