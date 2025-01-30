export const getUrl = (path) => import.meta.env.VITE_API_BASE_URL + path;

export const config = Object.freeze({
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
	apis: {
		movies: getUrl("/media/movies/list"),
		series: getUrl("/media/series/list"),
		movieSeries: getUrl("/media/movie-series/list"),
		json: getUrl("/media/json"),
		
		downloadJobs: getUrl("/downloads/jobs"),

		downloadsDirectory: getUrl("/files"),
		moveDownloadedFile: (fileName) => getUrl(`/files/${fileName}/move`),
	},
});

const makeNavLink = (name, path, iconClass) => ({ name, path, iconClass });
export const navConfig = Object.freeze([
	makeNavLink("Movies", "/", "bi-film"),
	makeNavLink("Movie Series", "/movie-series", "bi-collection-play"),
	makeNavLink("Series", "/series", "bi-tv"),
	makeNavLink("Downloads", "/download-jobs", "bi-cloud-download"),
	makeNavLink("Files", "/downloads-directory", "bi-folder"),
	makeNavLink("Settings", "/settings", "bi-gear"),
]);
