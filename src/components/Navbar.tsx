import { Link } from "react-router";
import Container from "./Container";

export default function Navbar() {
    return (
        <nav className="border-b border-b-neutral-200">
            <Container className="flex items-center h-16">
                <Link to="/" className="text-xl font-black">
                    MONEY<span className="text-blue-500">MANAGE</span>
                </Link>
            </Container>
        </nav>
    );
}
