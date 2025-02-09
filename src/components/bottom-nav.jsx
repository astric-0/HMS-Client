import { Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { navConfig } from "../config";

function BottomNav() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Nav
			className="mx-3 my-2 bottom-nav justify-content-around align-items-center rounded"
			activeKey={location.pathname}
		>
			{navConfig.map(({ name, path, iconClass }) => (
				<Nav.Item key={path}>
					<Nav.Link
						onClick={() => navigate(path)}
						active={location.pathname === path}
					>
						<i className={`bi ${iconClass}`}></i>
						<span>{name}</span>
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	);
}

export default BottomNav;
