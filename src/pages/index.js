import Blockbuster from '../components/blockbuster';
import OptInForm from '../components/form/opt-in-form';
import { useEffect, useState } from 'react';
import scrollDepth from '../utils/scrollDepth';
import Faqs from '../components/faqs';
import Link from 'next/link';
import Image from 'next/image';
import { info } from '../../info';

import jars from '../../public/assets/imagenes/jars.png';
import papaya from '../../public/assets/imagenes/papaya.png';
import jamaica from '../../public/assets/imagenes/jamaica.png';
import jar from '../../public/assets/imagenes/jar.png';
import ico01 from '../../public/assets/iconos/ico-natural.png';
import ico02 from '../../public/assets/iconos/ico-fruits.png';
import ico03 from '../../public/assets/iconos/ico-lowcalories.png';
import logo from '../../public/logo.png';

export default function Home() {
  const [lastClick, setLastClick] = useState('');

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  console.log(lastClick);

  return (
    <>
      <section
        className="flex-grow w-full flex flex-col justify-start items-center bg-[#ff874c] py-12">

        {/*<div className="flex items-center z-[1]">*/}
        {/*  <div className="container flex justify-center items-center">*/}
        {/*    <Link href="/" passhref>*/}
        {/*      <a className="relative flex items-center text-center h-[16rem] w-[16rem]">*/}
        {/*        <Image src={logo} alt={info.companyName} layout="fill" objectFit="contain"/>*/}
        {/*      </a>*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="relative w-full lg:w-1/2 text-center text-white z-10 p-8">
          <div className="relative w-2/3 pt-[75%] mx-auto">
            <Image src={jar} layout="fill" className="overflow-auto object-contain"/>
          </div>
          <h1
            className="ft-11 mb-12 relative font-semibold text-white [text-shadow:_2px_2px_0_rgb(0_0_0_/_60%)]">
            Cámbiale a tu mermelada de zarzamora que no tiene ni una zarzamora
          </h1>
          <p className="ft-3 text-white font-semibold mb-8">Distribuye mermeladas no aptas para mortales</p>
          <div className="grid grid-cols-3 gap-4 mb-16">
            <div className="flex flex-col border-2 border-white backdrop-blur-lg rounded-2xl p-8 justify-between">
              <div className="relative pt-[8rem] invert">
                <Image src={ico02} layout="fill" className="object-contain"/>
              </div>
              <p className="ft-4 font-semibold text-center mt-8">Sabores únicos</p>
            </div>
            <div className="flex flex-col border-2 border-white backdrop-blur-lg rounded-2xl p-8 justify-between">
              <div className="relative pt-[8rem] invert">
                <Image src={ico01} layout="fill" className="object-contain"/>
              </div>
              <p className="ft-4 font-semibold text-center mt-8">100% natural</p>
            </div>
            <div className="flex flex-col border-2 border-white backdrop-blur-lg rounded-2xl p-8 justify-between">
              <div className="relative pt-[8rem] invert">
                <Image src={ico03} layout="fill" className="object-contain"/>
              </div>
              <p className="ft-4 font-semibold text-center">Baja en calorías</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-12">
            <a
              href="#contact"
              className="button !w-full"
            >Quiero vender en mi negocio</a>
            <a
              href="https://www.amazon.com.mx/dp/B0D79VFV1K"
              className="button-secondary !w-full"
              target="_blank"
            >O compra en Amazon para que pruebes</a>
          </div>
        </div>
      </section>

      <section className="bg-brand-2 py-16">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-12 rounded-2xl bg-white">
            <p className="ft-2 text-brand-2 font-semibold ">”Nunca me imaginé que iba a ser fan de una jalea de papaya,
              está súper rica. ¡Todos en mi familia la amamos! Definitivamente la voy a volver a pedir”</p>
            <p>— Fernando T.</p>
          </div>
          <div className="p-12 rounded-2xl bg-white">
            <p className="ft-2 text-brand-2 font-semibold ">”Es la tercera vez que la pido, neta está deliciosa. Se las
              súper recomiendo, queda super bien con las tablitas de quesos. Nunca puede faltar en mi alacena!”</p>
            <p>— Carla P.</p>
          </div>
          <div className="p-12 rounded-2xl bg-white">
            <p className="ft-2 text-brand-2 font-semibold ">“Un amigo la llevó a mi casa para un desayuno y desde
              entonces es mi jalea favorita. Un panecito tostado con jalea de papaya y un cafecito para iniciar el día.
              Súper recomendable”</p>
            <p>— Ricardo S.</p>
          </div>
        </div>
      </section>

      <section className="container my-20">
        <h2 className="font-bold text-center text-brand-2">Dos sabores exóticos que, la neta, no saben tan exóticos</h2>
        <div className="grid grid-cols-2 gap-8 py-12">
          <div className="relative w-full pt-[100%] p-4 rounded-2xl bg-gray-300 overflow-hidden">
            <Image src={papaya} layout="fill" className="object-cover"/>
          </div>
          <div className="relative w-full pt-[100%] p-4 rounded-2xl bg-gray-300 overflow-hidden">
            <Image src={jamaica} layout="fill" className="object-cover"/>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-brand-3">
        <div className="container my-16">
          <div className="mx-auto py-16 md:w-1/2">
            <h2 className="font-bold mb-12">Regálanos un par de datos para compartirte los beneficios de
              distribuir FrutaBomba</h2>
            <OptInForm/>
          </div>
        </div>
      </section>

    </>
  );
}
