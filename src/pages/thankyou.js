import { info } from '../../info';
import fbEvent from '../services/fbEvents';
import Header from '../components/layout/header';

export default function ThankYou() {
  return (
    <>
      <Header/>
      <section className="relative flex flex-col flex-grow justify-center py-20 px-0">
        <div className="container md:w-1/2 flex flex-col items-center">
          <h2 className="ft-8 text-center">
            ¡Gracias! <br/>Muy pronto estaremos platicándote lo chido que es vender FrutaBomba!
          </h2>
          <div className="flex flex-col items-center justify-center">
            <p className="text-center ft-2 my-12">
              Si no se abrió tu WhatsApp
            </p>
            <div className="flex flex-col items-center justify-center gap-10">
              <a
                className="button hover:scale-105 bg-brand-2 hover:bg-brand-3 ft-4 flex justify-center items-center "
                href={`https://wa.me/${info.whatsapp.value}`}
                target="_blank"
              >
                <span className="material-icons">arrow_forward</span>Da click aquí
                <span className="text-white material-icons">arrow_back</span>
              </a>
              <a
                className="ft-2 py-3 px-6 rounded-lg items-center text-brand-1 cursor-pointer"
                href={`tel:${info.whatsapp.value}`}
                target="_blank"
                onClick={() => fbEvent(
                  'Contact',
                  {phone: '', externalID: '', email: ''},
                )}
              >
                O llámanos por <span className="font-semibold">teléfono</span> ›
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
