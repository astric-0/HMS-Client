import { useQuery, useMutation } from "@tanstack/react-query";
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

export const useCreateJson = (mediaType) => {
	return useMutation({
		mutationFn: async () => {
			const response = await fetch(config.apis[mediaType]);
			return response.json();
		},
	});
};

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
