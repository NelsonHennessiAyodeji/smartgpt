import Link from "next/link";

const links = [
  { href: "https://smartgpt-nu.vercel.app/chat", label: "chat" },
  { href: "https://smartgpt-nu.vercel.app/books", label: "books" },
  { href: "./books/new-book", label: "new book" },
  { href: "https://smartgpt-nu.vercel.app/profile", label: "profile" },
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
