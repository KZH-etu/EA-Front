import { useEffect, useState } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import { MediaVersion, useMediaVersionsStore, } from '../../stores/useMediaVersionStore';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Globe,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DocumentVersionForm } from '../../components/admin/MediaVersionForm';
import { useEntitiesStore } from '../../stores/useEntitiesStore';
import { useLanguagesStore } from '../../stores/useLanguageStore';

const VersionMediaPage = () => {
  const { entities, loading: entitiesLoading, error: entitiesError, fetchEntities } = useEntitiesStore();
  const { languages, fetchLanguages } = useLanguagesStore();

  // MediaVersions = versions traduites
  const {
    mediaVersions,
    loading: versionsLoading,
    error: versionsError,
    addMediaVersion,
    updateMediaVersion,
    deleteMediaVersion
  } = useMediaVersionsStore();

  const [showForm, setShowForm] = useState(false);
  const [editingVersion, setEditingVersion] = useState<MediaVersion | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filteredVersions = mediaVersions.filter((version) => {
    const entity = entities.find(e => e.id === version.documentId);
    return (
      (entity?.globalTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (version.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (languages.find(l => l.id === version.languageId)?.title.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    );
  });

  const handleFormSubmit = async (version : MediaVersion) => {
    setSubmitting(true);
    try {
      if (editingVersion) {
        await updateMediaVersion(version.id, version);
      } else {
        await addMediaVersion(version);
      }
      setShowForm(false);
      setEditingVersion(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id : string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette version ?')) {
      await deleteMediaVersion(id);
    }
  };

  const handleEdit = (version: MediaVersion) => {
    setEditingVersion(version);
    setShowForm(true);
  };

  if (entitiesLoading || versionsLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des versions de média</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingVersion(null);
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter
        </button>
      </div>

      {(entitiesError || versionsError) && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {entitiesError || versionsError}
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Rechercher par titre, langue..."
            className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-6 py-3 text-left">Document</th>
              <th className="px-6 py-3 text-left">Langue</th>
              <th className="px-6 py-3 text-left">Titre traduit</th>
              <th className="px-6 py-3 text-left">Date publication</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVersions.map((version) => {
              const entity = entities.find(e => e.id === version.documentId);
              return (
                <tr key={version.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-4">{entity?.globalTitle || <span className="text-neutral-400">Inconnu</span>}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Globe size={16} className="text-neutral-400" />
                    {languages.find(l => l.id === version.languageId)?.title}
                  </td>
                  <td className="px-6 py-4">{version.title}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Calendar size={16} className="text-neutral-400" />
                    {version.publishedAt ? new Date(version.publishedAt).toLocaleString() : ''}
                  </td>
                  <td className="px-6 py-4">{version.description || <span className="text-neutral-400">-</span>}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(version)}
                      className="text-primary-600 hover:text-primary-800 p-2"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(version.id)}
                      className="text-error hover:text-error/80 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingVersion ? 'Modifier' : 'Créer'} une version traduite
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingVersion(null);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>
            <DocumentVersionForm
              languages={languages}
              entities={entities}
              existingVersions={mediaVersions}
              initialData={editingVersion}
              onSubmit={async (version) => {
                await handleFormSubmit(version);
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingVersion(null);
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VersionMediaPage;