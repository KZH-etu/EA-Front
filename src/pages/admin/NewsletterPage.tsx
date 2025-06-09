import { useState } from 'react';
import { Mail, Send, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSubscriberStore } from '../../stores/useSubscriberStore';

const NewsletterPage = () => {
  const { 
    items: subscribers, 
    loading, 
    error, 
    fetchAll: fetchSubscribers,
    create: addSuscriber, 
    remove: deleteSuscriber
  } = useSubscriberStore();
  const [newEmail, setNewEmail] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendNewsletter = async (e : React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject.trim() || !emailContent.trim()) return;

    setSending(true);
    try {
      // Simulate sending newsletter
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEmailSubject('');
      setEmailContent('');
      alert('Newsletter sent successfully!');
    } catch (error) {
      console.error('Failed to send newsletter:', error);
    } finally {
      setSending(false);
    }
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    try {
      await addSuscriber({
        email: newEmail.trim(),
      });
      setNewEmail('');
    } catch (error) {
      console.error('Failed to add subscriber:', error);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      await deleteSuscriber(id);
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion de la Newsletter</h1>

      {error && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 rounded">
          {error}
        </div>
      )}

      {/* Send Newsletter Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Envoyer une Newsletter</h2>
        <form onSubmit={handleSendNewsletter} className="space-y-4">
          <div>
            <label htmlFor="subject" className="form-label">Sujet</label>
            <input
              type="text"
              id="subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="form-input"
              placeholder="Entrez le sujet de la newsletter"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="form-label">Contenu</label>
            <textarea
              id="content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="form-input min-h-[200px]"
              placeholder="Rédigez le contenu de votre newsletter..."
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary flex items-center"
            disabled={sending}
          >
            {sending ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Envoyer la Newsletter
              </>
            )}
          </button>
        </form>
      </div>

      {/* Subscribers Management */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Abonnés</h2>
          <div className="flex items-center">
            <form onSubmit={handleAddSubscriber} className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Ajouter un abonné"
                className="form-input"
                required
              />
              <button type="submit" className="btn-secondary">
                Ajouter
              </button>
            </form>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Date d'inscription</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Mail size={16} className="text-neutral-400 mr-2" />
                      {subscriber.email}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(subscriber.subscribedAt), 'dd MMMM yyyy', { locale: fr })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                        className="p-2 text-error hover:bg-error/10 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-neutral-600 text-sm">
          Total des abonnés: {subscribers.length}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;