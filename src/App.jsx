import "./App.css";
import BridgeTransactions from "./components/BridgeTransaction";
import BurnTokens from "./components/BurnTokens";

function App() {
	return (
		<div>
			<BurnTokens />
			<BridgeTransactions />
		</div>
	);
}

export default App;
