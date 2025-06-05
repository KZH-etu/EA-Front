import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader 
        title={t('nav.contact')}
        subtitle={t('contact.subtitle')}
        backgroundImage="https://images.pexels.com/photos/2425232/pexels-photo-2425232.jpeg"
      />
      
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">{t('contact.getInTouch')}</h2>
            <p className="text-neutral-600">
              {t('contact.description')}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <span>+225 01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <span>contact@assemblee-abidjan.org</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span>123 Rue Principale, Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors"
              >
                {t('contact.form.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;