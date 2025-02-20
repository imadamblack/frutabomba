import Link from 'next/link';
import { info } from '../../../info';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { restrictNumber, emailRegExp, cleanPhone } from '../../utils/formValidators';
import fbEvent from '../../services/fbEvents';
import { Radio, Select } from './formAtoms';

export default function OptInForm({lastClick = ''}) {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch
  } = methods;

  const onSubmit = (data) => {
    setSending(true);
    data.phone = cleanPhone(data.phone);
    data.origin = 'Notoriovs Landing';
    data.lastClick = lastClick;
    data.city = data.city === 'otro' ? data.cityOther : data.city;

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
    <FormProvider {...methods}>
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
        <Select
          name="city"
          placeholder="Tu ciudad"
          inputOptions={{required: true}}
          options={[
            {value: 'cdmx', name: 'CDMX'},
            {value: 'ensenada', name: 'Ensenada'},
            {value: 'hermosillo', name: 'Hermosillo'},
            {value: 'mexicali', name: 'Mexicali'},
            {value: 'queretaro', name: 'Querétaro'},
            {value: 'rosarito', name: 'Rosarito'},
            {value: 'tijuana', name: 'Tijuana'},
            {value: 'otro', name: 'Otra'},
          ]}
        />
        {watch('city') === 'otro' && <input {...register('cityOther',{required: true})} className={errors.cityOther && '!bg-red-200'} placeholder="Cuál ciudad?"/>}

        <Select
          name="pos"
          placeholder="Cómo piensas distribuir Fruta Bomba?"
          inputOptions={{required: true}}
          options={[
            {value: 'tienda-fisica', name: 'Mi tienda física'},
            {value: 'online', name: 'En línea'},
            {value: 'cambaceo', name: 'Cambaceo'},
            {value: 'otro', name: 'Otro'},
          ]}
        />
        <div className="bg-white p-8 rounded-xl">
          <p>Estás dispuesto a realizar un pedido mínimo?</p>
          <Radio
            name="commitment"
            inputOptions={{required: true}}
            options={[
              {value: 'si', label: 'Sí, claro!'},
              {value: 'no', label: 'No creo'},
              {value: 'sample', label: 'Primero una muestra'},
            ]}
          />
        </div>
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
    </FormProvider>
  );
}