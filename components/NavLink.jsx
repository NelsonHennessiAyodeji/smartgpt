import Link from "next/link";

const links = [
  { href: "./chat", label: "chat" },
  { href: "./books", label: "books" },
  { href: "./books/new-books", label: "new book" },
  { href: "./profile", label: "profile" },
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
