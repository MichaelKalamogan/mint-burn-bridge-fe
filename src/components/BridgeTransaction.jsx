import { useState } from "react";
import axios from "axios";
import "./BridgeTransactions.css"; // Import the CSS file
import BurnTokens from "./BurnTokens";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BridgeTransactions = () => {
	const [status, setStatus] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchTransactions = async () => {
		setLoading(true);
		let url = backendUrl;
		try {
			if (status) {
				url += `?status=${status}`;
			}

			const response = await axios.get(url);
			setTransactions(response.data.transactions);
		} catch (err) {
			console.error("Failed to fetch", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<h1 className="title">Bridge Transactions</h1>

			<div>
				<label>Status</label>
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value="">Select status (optional)</option>
					<option value="PROCESSING">PROCESSING</option>
					<option value="MINTED">MINTED</option>
					<option value="RELAYED">RELAYED</option>
					<option value="COMPLETED">COMPLETED</option>
					<option value="FAILED">FAILED</option>
				</select>
			</div>

			<button onClick={fetchTransactions} className="button">
				Fetch Transactions
			</button>

			{loading && <p className="loading">Loading...</p>}

			<div className="table-container">
				{transactions.length > 0 ? (
					<table className="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Burn Network</th>
								<th>Burn Address</th>
								<th>Mint Network</th>
								<th>Mint Address</th>
								<th>Task ID</th>
								<th>Status</th>
								<th>Created At</th>
								<th>Updated At</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((tx) => (
								<tr key={tx.id}>
									<td>{tx.id}</td>
									<td>{tx.burnNetwork}</td>
									<td>{tx.burnAddress}</td>
									<td>{tx.mintNetwork}</td>
									<td>{tx.mintAddress}</td>
									<td>{tx.taskId || "N/A"}</td>
									<td>{tx.status}</td>
									<td>{new Date(tx.createdAt).toLocaleString()}</td>
									<td>{new Date(tx.updatedAt).toLocaleString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="no-transactions">No transactions found.</p>
				)}
			</div>
			<br></br>

			<BurnTokens fetchTransactions={fetchTransactions} />
		</div>
	);
};

export default BridgeTransactions;
