import Link from "next/link";

type props = {
  message: string;
  link: string;
  text: string;
};

export default function NoAccountExistDisplay({ message, link, text }: props) {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center space-y-6">
      <h1 className="text-2xl font-bold">{message}</h1>
      <Link href={link}>
        <button className="btn btn-soft btn-primary">{text}</button>
      </Link>
    </div>
  );
}
