import React, { useContext } from "react";
import { contactContext } from "../../context/ContactProvider";

const Search = () => {
	const { search, setSearch } = useContext(contactContext);
	return (
		<div className="searchFormWrapper">
			<div className="input-field">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M10 13c-.35.59-.64 1.24-.81 1.93C6.5 15.16 3.9 16.42 3.9 17v1.1h5.3c.17.68.45 1.32.8 1.9H2v-3c0-2.66 5.33-4 8-4m0-9a4 4 0 0 1 4 4c0 .91-.31 1.75-.82 2.43c-.86.32-1.63.83-2.27 1.47L10 12a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 1.9A2.1 2.1 0 0 0 7.9 8a2.1 2.1 0 0 0 2.1 2.1A2.1 2.1 0 0 0 12.1 8A2.1 2.1 0 0 0 10 5.9m5.5 6.1c2.5 0 4.5 2 4.5 4.5c0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5"></path>
				</svg>
				<input
					type="text"
					name="search"
					id="search"
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder="نام، ایمیل ویا شماره تلفن مخاطب را وارد کنید"
				/>
			</div>
			<button className="btn primary"> جستو جو</button>
		</div>
	);
};

export default Search;
