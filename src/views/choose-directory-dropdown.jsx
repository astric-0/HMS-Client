import { useMemo } from "react";
import { Dropdown } from "react-bootstrap";
import { MEDIA_TYPES } from "../constants";
import PropTypes from "prop-types";

function ChooseDirectoryDropdown({ rootDir, handleChooseRootDir }) {
	const mediaTypes = useMemo(() => Object.entries(MEDIA_TYPES), []);

	return (
		<Dropdown>
			<Dropdown.Toggle variant="transparent" className="my-1 w-100" id="dropdown-basic">
				{rootDir}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{mediaTypes.map(([key, dir]) => (
					<Dropdown.Item
						key={key}
						onClick={() => handleChooseRootDir(dir)}
						active={rootDir == dir}
					>
						{key}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

ChooseDirectoryDropdown.propTypes = {
	handleChooseRootDir: PropTypes.func.isRequired,
	rootDir: PropTypes.string.isRequired,
};

export default ChooseDirectoryDropdown;
