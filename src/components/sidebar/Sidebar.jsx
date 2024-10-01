import React from 'react'
import logo from "../../assets/images/logo.png";
const Sidebar = () => {
  return (
		<div className="sidebar">
			<div className="head">
				<img src={logo} alt="logo app" />
				<h1>اپلیکیشن مخاطبین</h1>
				<button className="menuBtn">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.45}
							d="M6 8h12M6 12h12M6 16h12"></path>
					</svg>
				</button>
			</div>
			<div className="navbar">
				<h3 className="titleMenu">منوی اصلی</h3>
				<ul className="menuList">
					<li className="menuItem">
						<a href="#" className="menuLink active">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
								<path
									fill="currentColor"
									d="M28.4 124.8a6 6 0 0 0 8.4-1.2a54 54 0 0 1 86.4 0a6 6 0 0 0 8.4 1.19a5.6 5.6 0 0 0 1.19-1.19a54 54 0 0 1 86.4 0a6 6 0 0 0 9.6-7.21a65.74 65.74 0 0 0-29.69-22.26a38 38 0 1 0-46.22 0A65.3 65.3 0 0 0 128 110.7a65.3 65.3 0 0 0-24.89-16.57a38 38 0 1 0-46.22 0A65.7 65.7 0 0 0 27.2 116.4a6 6 0 0 0 1.2 8.4M176 38a26 26 0 1 1-26 26a26 26 0 0 1 26-26m-96 0a26 26 0 1 1-26 26a26 26 0 0 1 26-26m119.11 160.13a38 38 0 1 0-46.22 0A65.3 65.3 0 0 0 128 214.7a65.3 65.3 0 0 0-24.89-16.57a38 38 0 1 0-46.22 0A65.7 65.7 0 0 0 27.2 220.4a6 6 0 1 0 9.6 7.2a54 54 0 0 1 86.4 0a6 6 0 0 0 8.4 1.19a5.6 5.6 0 0 0 1.19-1.19a54 54 0 0 1 86.4 0a6 6 0 0 0 9.6-7.21a65.74 65.74 0 0 0-29.68-22.26M80 142a26 26 0 1 1-26 26a26 26 0 0 1 26-26m96 0a26 26 0 1 1-26 26a26 26 0 0 1 26-26"></path>
							</svg>
							<span>همه مخاطب ها</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Sidebar