import React, { useContext } from "react";
import { contactContext } from "../../context/ContactProvider";
import Loading from "../../components/loading/Loading";
import Contacts from "../../components/contact/Contacts";
import Search from "../../components/search/Search";
const Home = () => {
	const { loading, contacts } = useContext(contactContext);
	return (
		<div className="mainWrapper">
			<div className="mainHead">
				<div className="main-title">
					<h2>مخاطبین</h2>
					<p>مخاطبین خود را مدیریت کنید</p>
				</div>
				<Search />
			</div>
			{/* contacts components */}
			{loading && <Loading />}
			{contacts?.length == 0 && (
				<h1 className="notContact">
					<bdi> مخاطبی وجود ندارد ! </bdi>
				</h1>
			)}
			{contacts?.length > 0 && <Contacts />}
			{/* {contacts?.length > 0 && loading && <h1>مخاطبی وجود ندار !</h1>} */}
			{/* {loading && <Loading /> } */}
			{/* contacts components */}
		</div>
	);
};

export default Home;
