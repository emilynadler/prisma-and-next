import Link from "next/link";

export default function Navbar() {
	return (
		<ul className="Navbarone">
			<li className="Navbartwo">
				<a className="navlinks" href="/">
					Home
				</a>
			</li>
			<li className="Navbartwo">
				<a className="navlinks" href="./Posts">
					Posts
				</a>
			</li>
			<li className="Navbartwo">
				<a className="navlinks" href="./Create">
					Create a Post
				</a>
			</li>
			<li className="Navbartwo">
				<a className="navlinks" href="./Search">
					Giphy Search
				</a>
			</li>

			<li className="Navbartwo">
				<a className="navlinks" href="./Weather">
					Weather
				</a>
			</li>
		</ul>
	);
}
