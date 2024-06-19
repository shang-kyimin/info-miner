import Link from "next/link";


export default function Logo() {
  return (
    <Link href="/">
      <h6 className="text-xl tracking-wide font-light">
        <span className="font-medium text-primary">Info</span>
        Miner
      </h6>
    </Link>
  );
}


