import { useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BridgeTransactions = () => {
	const [transactions, setTransactions] = useState([]);

	const fetchTransactions = async () => {
		try {
			const response = await axios.get(backendUrl);
			setTransactions(response.data);
		} catch (err) {
			console.error("Failed to fetch", err);
		}
	};

	return (
		<div>
			<h1>Bridge Transactions</h1>

			<button onClick={fetchTransactions}>Fetch Transactions</button>

			<div>
				{transactions.length > 0 ? (
					<table>
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
					<p>No transactions found.</p>
				)}
			</div>
		</div>
	);
};

export default BridgeTransactions;
