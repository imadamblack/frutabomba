import Link from 'next/link';
import { info } from '../../../info';
import Image from 'next/image';
import logo from '../../../public/logo.png';

export default function Header() {
  return (

    <header
      className={`relative top-0 w-screen h-[20rem] flex justify-center z-[99] hover:top-0`}
    >
      <div className="flex items-center z-[1]">
        <div className="container flex justify-center items-center">
          <Link href="/" passhref>
            <a className="relative flex items-center text-center h-[16rem] w-[16rem]">
              <Image src={logo} alt={info.companyName} layout="fill" objectFit="contain"/>
              {/*<p className="text-center ft-6 font-semibold text-white">{info.companyName}</p>*/}
            </a>
          </Link>
        </div>
      </div>
    </header>

  );
}
