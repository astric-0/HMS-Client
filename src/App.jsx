import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/bottom-nav";
import Movies from "./pages/movies";
import Series from "./pages/series";
import MovieSeries from "./pages/movie-series";
import Settings from "./pages/settings";
import DownloadJobs from "./pages/download-job";
import Directory from "./pages/directory";
import "./App.css";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className="app-container">
					<div className="content-wrapper">
						<Routes>
							<Route path="/" element={<Movies />} />
							<Route path="/series" element={<Series />} />
							<Route path="/movie-series" element={<MovieSeries />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/download-jobs" element={<DownloadJobs />} />
							<Route
								path="/directory"
								element={<Directory />}
							/>
						</Routes>
					</div>
					<BottomNav />
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
