import { Container } from "react-bootstrap";
import CreateJsonView from "../views/CreateJsonView";

function Settings() {
	return (
		<Container>
			<h3 className="my-3">Settings</h3>
			<CreateJsonView />
		</Container>
	);
}

export default Settings;
