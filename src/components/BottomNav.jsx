import { Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Nav
			className="mx-3 my-2 bottom-nav justify-content-around align-items-center rounded-pill"
			activeKey={location.pathname}
		>
			<Nav.Item>
				<Nav.Link
					onClick={() => navigate("/")}
					active={location.pathname === "/"}
				>
					<i className="bi bi-film"></i>
					<span>Movies</span>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					onClick={() => navigate("/movie-series")}
					active={location.pathname === "/movie-series"}
				>
					<i className="bi bi-collection-play"></i>
					<span>Movie Series</span>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					onClick={() => navigate("/series")}
					active={location.pathname === "/series"}
				>
					<i className="bi bi-tv"></i>
					<span>Series</span>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					onClick={() => navigate("/settings")}
					active={location.pathname === "/settings"}
				>
					<i className="bi bi-gear"></i>
					<span>Settings</span>
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}

export default BottomNav;
