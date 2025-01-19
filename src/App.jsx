import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MovieSeries from "./pages/MovieSeries";
import Settings from "./pages/Settings";
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
						</Routes>
					</div>
					<BottomNav />
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
