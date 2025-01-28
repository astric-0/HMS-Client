import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../config";

export const useMovies = () => {
	return useQuery({
		queryKey: ["movies"],
		queryFn: async () => {
			const response = await fetch(config.apis.movies);
			return response.json();
		},
	});
};

export const useSeries = () => {
	return useQuery({
		queryKey: ["series"],
		queryFn: async () => {
			const response = await fetch(config.apis.series);
			return response.json();
		},
	});
};

export const useMovieSeries = () => {
	return useQuery({
		queryKey: ["movieSeries"],
		queryFn: async () => {
			const response = await fetch(config.apis.movieSeries);
			return response.json();
		},
	});
};

export const useDownloadJobs = () => {
	return useQuery({
		queryKey: ["mediaDownloads"],
		queryFn: async () => {
			const response = await fetch(config.apis.downloadJobs);
			return response.json();
		},
	});
};

export const useAddDownloads = () => {
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

export const useDownloadsDirectory = () => {
	return useQuery({
		queryKey: ["downloadsDirectory"],
		queryFn: async () => {
			const response = await fetch(config.apis.downloadsDirectory);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		},
	});
};

export const useRemoveDownloadedFile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (file) => {
			const response = await fetch(config.apis.downloadsDirectory, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(file),
			});

			if (!response.ok) throw new Error(response?.json()?.error);

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries("downloadsDirectory");
		},
	});
};

export const useMoveFileMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (movePayload) => {
			const response = await fetch(
				config.apis.moveDownloadedFile(movePayload.file.name),
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(movePayload),
				}
			);

			if (!response.ok) throw new Error(response?.json()?.error);
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries("downloadsDirectory");
		},
	});
};
