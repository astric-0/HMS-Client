import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export default function LoadingButton({ loading, text = "", iconClass, onClick }) {
	return (
		<Button
			variant="outline-primary"
			className="w-100 py-3"
			disabled={loading}
			onClick={onClick}
		>
			{loading ? (
				<>
					<span className="spinner-border spinner-border-sm me-2" />
					{text}...
				</>
			) : (
				<>
					<i className={`bi ${iconClass} me-2`} />
					{text}
				</>
			)}
		</Button>
	);
}

LoadingButton.propTypes = {
	loading: PropTypes.bool.isRequired,
	text: PropTypes.string,
	iconClass: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
