import Link from "next/link";

const links = [
  { href: "http://localhost:3000/chat", label: "chat" },
  { href: "http://localhost:3000/books", label: "books" },
  { href: "./books/new-book", label: "new book" },
  { href: "http://localhost:3000/profile", label: "profile" },
];

const NavLink = () => {
  return (
    <ul className="menu text-base-content">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className="capitalize">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLink;
