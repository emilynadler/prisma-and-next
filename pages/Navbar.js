import Link from "next/link";

export default function Navbar() {
	return (
		<ul className="Navbarone">
			<li className="Navbartwo">
				<a className="navlinks" href="./Create">
					Create a Post
				</a>
			</li>
			<li className="Navbartwo">
				<a className="navlinks" href="./Emily">
					About Me
				</a>
			</li>
			<li className="Navbartwo">
				<a className="navlinks" href="/">
					Home
				</a>
			</li>
			<Link href="/Posts">
				<a className="navlinks">Posts</a>
			</Link>
		</ul>
	);
}
