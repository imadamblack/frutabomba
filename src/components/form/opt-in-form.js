import Link from 'next/link';
import { info } from '../../../info';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { restrictNumber, emailRegExp, cleanPhone } from '../../utils/formValidators';
import fbEvent from '../../services/fbEvents';

export default function OptInForm({lastClick = ''}) {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    setSending(true);
    data.phone = cleanPhone(data.phone);
    data.origin = 'Notoriovs Landing';
    data.lastClick = lastClick;

    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const payload = {...data, _fbc, _fbp};

    // POST to Make.com Webhook
    fetch(info.optInWebhook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => result.json())
      // Send FB Event
      .then(({id}) => {
        fbEvent(
          'Lead',
          {phone: data.phone, externalID: id},
        );
        setCookie('lead', {...data, id});
        return id;
      })
      // Redirect to Survey Page
      .then(() => router.push(`/thankyou`));
  };

  return (
    <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register(
          'fullName',
          {
            required: true,
          },
        )}
        className={errors.fullName && '!bg-red-200'}
        placeholder="Tu nombre"/>
      <input
        {...register(
          'phone',
          {required: true, maxLength: 10, minLength: 10},
        )}
        className={errors.phone && '!bg-red-200'}
        onKeyDown={restrictNumber}
        placeholder="Teléfono de WhatsApp"/>
      <input
        {...register(
          'city',
          {
            required: true,
          },
        )}
        className={errors.city && '!bg-red-200'}
        placeholder="Tu ciudad"/>

      <button
        disabled={sending}
        className={`w-full ${sending ? '!bg-transparent' : 'hover:!bg-brand-3'}`}
      >{
        !sending
          ? 'Enviar WhatsApp →'
          : <span className="material-symbols-outlined animate-spin">progress_activity</span>
      }</button>

      <div className="mt-4">
        <p className="-ft-3 text-center text-white">Al dar clic aceptas nuestra&nbsp;
          <Link href={info.privacyNotice}>política de privacidad</Link>
        </p>
      </div>
    </form>
  );
}