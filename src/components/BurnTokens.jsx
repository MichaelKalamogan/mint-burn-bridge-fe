import { useState } from "react";
import axios from "axios";
import "./BridgeTransactions.css"; // Reusing the same CSS file

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BurnTokens = () => {
	const [network, setNetwork] = useState("");
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleBurn = async () => {
		if (!network || !amount) {
			setMessage("Please select a network and enter an amount.");
			return;
		}

		setLoading(true);
		setMessage("");

		try {
			const response = await axios.post(`${backendUrl}/burn`, { network, amount });
			setMessage(`Burn successful: ${response.data.message}`);
		} catch (err) {
			console.error("Burn failed", err);
			setMessage("Failed to burn tokens. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<h1 className="title">Burn Tokens</h1>

			<div className="mb-4">
				<label>Network</label>
				<select value={network} onChange={(e) => setNetwork(e.target.value)}>
					<option value="">Select network</option>
					<option value="ARBITRUM">ARBITRUM</option>
					<option value="SEPOLIA">SEPOLIA</option>
				</select>
			</div>

			<div className="mb-4">
				<label>Amount</label>
				<input
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					placeholder="Enter amount to burn"
					className="input"
				/>
			</div>

			<button onClick={handleBurn} className="button" disabled={loading}>
				{loading ? "Processing..." : "Burn"}
			</button>

			{message && <p className="loading">{message}</p>}
		</div>
	);
};

export default BurnTokens;
