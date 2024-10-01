import "./App.css";
import Header from "./components/header/Header";
import ContactProvider from "./context/ContactProvider";
import DeleteContactModal from "./components/modals/DeleteContactModal";
import CreateNewContactModal from "./components/modals/CreateNewContactModal";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import GroupDeleteContactsModal from "./components/modals/GroupDeleteContactsModal";
import EditContactModal from "./components/modals/EditContactModal";

function App() {
	return (
		<ContactProvider>
			<div className="App">
				<Sidebar />
				<main className="main">
					<Header />
					<Home />
				</main>
				<DeleteContactModal />
				<CreateNewContactModal />
				<GroupDeleteContactsModal />
				<EditContactModal />
			</div>
		</ContactProvider>
	);
}

export default App;
