import {
	useQuery,
	QueryClientProvider,
	QueryClient,
} from "@tanstack/react-query";
import MovieList from "./MovieList";
import "./App.css";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Wrapper />
		</QueryClientProvider>
	);
}

function Wrapper() {
	const baseUrl = "http://192.168.1.10:3000";
	//const baseUrl = "http://localhost:3000";
	const { data, isLoading } = useQuery({
		queryKey: ["files"],
		queryFn: async () => {
			const response = await fetch(`${baseUrl}/media/movies/list`);
			return response.json();
		},
	});

	const getUrl = (path) => {
		return `${baseUrl}${path}`;
	};

	const handleOpenInVLC = (path) => {
		const vlcLink = `vlc://${getUrl(path)}`;
		window.location.href = vlcLink; // Open VLC link in a new tab
	};

	return (
		<>
			<h3>Movies</h3>
			{!isLoading && (
				<MovieList
					files={data.videos}
					onFileClick={handleOpenInVLC}
					getUrl={getUrl}
				/>
			)}
		</>
	);
}

export default App;
