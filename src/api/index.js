import { config } from "../config";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const queryKeys = Object.keys({
	movies: "movies",
	movieSeries: "movieSeries",
	series: "series",
	directoryInfo: "directory-info",
	mediaDownloads: "mediaDownloads",
});

export const useMovies = () => {
	return useQuery({
		queryKey: [queryKeys.movies],
		queryFn: async () => {
			const response = await fetch(config.apis.movies);
			return response.json();
		},
	});
};

export const useSeries = () => {
	return useQuery({
		queryKey: [queryKeys.series],
		queryFn: async () => {
			const response = await fetch(config.apis.series);
			return response.json();
		},
	});
};

export const useMovieSeries = () => {
	return useQuery({
		queryKey: [queryKeys.movieSeries],
		queryFn: async () => {
			const response = await fetch(config.apis.movieSeries);
			return response.json();
		},
	});
};

export const useDownloadJobs = () => {
	return useQuery({
		queryKey: [queryKeys.mediaDownloads],
		queryFn: async () => {
			const response = await fetch(config.apis.downloadJobs);
			return response.json();
		},
	});
};

export const useAddDownloads = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data) => {
			const response = await fetch(config.apis.downloadJobs, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries(queryKeys.mediaDownloads);
		},
	});
};

// export const useCreateJson = (mediaType) => {
// 	return useMutation({
// 		mutationFn: async () => {
// 			const response = await fetch(config.apis[mediaType]);
// 			return response.json();
// 		},
// 	});
// };

export const createJson = async (mediaType) => {
	const response = await fetch(config.apis.json, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ media_type: mediaType }),
	});
	return response.json();
};

export const useDirectoryInfo = (rootDir, path) => {
	return useQuery({
		queryKey: [queryKeys.directoryInfo, rootDir, ...path],
		queryFn: async () => {
			const url = new URL(config.apis.directory + "/directory/" + rootDir);

			if (path?.length) url.search = new URLSearchParams({ path });

			const response = await fetch(url);

			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);

			return await response.json();
		},
	});
};

export const useRemoveFile = (source) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (name, isDir) => {
			const response = await fetch(config.apis.removeFile(name), {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ source, isDir }),
			});

			if (!response.ok) {
				const error = await response?.json();
				throw new Error(error);
			}

			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.directoryInfo]);
		},
	});
};

export const useMoveFileMutation = (source) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ destination, file }) => {
			const response = await fetch(config.apis.moveDownloadedFile(file.name), {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					filename: file.name,
					source,
					destination,
				}),
			});

			if (!response.ok) {
				const error = await response?.json();
				throw new Error(error);
			}

			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.directoryInfo]);
		},
	});
};