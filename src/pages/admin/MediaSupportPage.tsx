import { useState } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import {MediaType, MediaSupport, useMediaSupportsStore } from '../../stores/useMediaSupportStore';
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  X,
  Link as LinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MediaSupportForm } from '../../components/admin/MediaSupportForm';
import { useMediaVersionsStore } from '../../stores/useMediaVersionStore';

const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' }
];

const MEDIA_TYPE_LABELS = {
  [MediaType.TEXT]: 'Texte',
  [MediaType.AUDIO]: 'Audio',
  [MediaType.VIDEO]: 'Vidéo'
};

const MediaSupportPage = () => {
  const { entities, loading: entitiesLoading, error: entitiesError } = useAdminStore();
  const {
    mediaVersions,
    loading: versionsLoading,
    error: versionsError,
  } = useMediaVersionsStore();

  const {
    mediaSupports,
    loading: supportsLoading,
    error: supportsError,
    addMediaSupport,
    updateMediaSupport,
    deleteMediaSupport
  } = useMediaSupportsStore();

  const [showForm, setShowForm] = useState(false);
  const [editingSupport, setEditingSupport] = useState<MediaSupport | null>(null);
  const [expandedEntityId, setExpandedEntityId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Filtrage principal sur entité
  const filteredEntities = entities.filter(entity =>
    entity.globalTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Récupère les langues disponibles pour une entité
  const getLanguagesForEntity = (entityId: string) => {
    const versions = mediaVersions.filter(v => v.documentId === entityId);
    const langs = Array.from(new Set(versions.map(v => v.languageId)));
    return langs;
  };

  // Récupère les types de média disponibles pour une entité
  const getMediaTypesForEntity = (entityId: string) => {
    const versions = mediaVersions.filter(v => v.documentId === entityId);
    const versionIds = versions.map(v => v.id);
    const types = Array.from(
      new Set(
        mediaSupports
          .filter(s => versionIds.includes(s.mediaVersionId))
          .map(s => s.mediaType)
      )
    );
    return types;
  };

  // Récupère les MediaVersions pour une entité
  const getVersionsForEntity = (entityId: string) =>
    mediaVersions.filter(v => v.documentId === entityId);

  // Récupère les MediaSupports pour une version
  const getSupportsForVersion = (versionId: string) =>
    mediaSupports.filter(s => s.mediaVersionId === versionId);

  const handleFormSubmit = async (supports: MediaSupport[]) => {
    setSubmitting(true);
    try {
      if (editingSupport) {
        for (const support of supports) {
          await updateMediaSupport(support.id, support);
        }
      } else {
        for (const support of supports) {
          await addMediaSupport(support);
        }
      }
      setShowForm(false);
      setEditingSupport(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (support: MediaSupport) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce support ?')) {
      await deleteMediaSupport(support.id);
    }
  };

  const handleEdit = (support: MediaSupport) => {
    setEditingSupport(support);
    setShowForm(true);
  };

  if (entitiesLoading || versionsLoading || supportsLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des supports média</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingSupport(null);
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter
        </button>
      </div>

      {(entitiesError || versionsError || supportsError) && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {entitiesError || versionsError || supportsError}
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher une entité..."
            className="pl-4 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau maître */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-6 py-3 text-left"></th>
              <th className="px-6 py-3 text-left">Titre de l’entité</th>
              <th className="px-6 py-3 text-left">Catégories</th>
              <th className="px-6 py-3 text-left">Langues disponibles</th>
              <th className="px-6 py-3 text-left">Types de média</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntities.map(entity => {
              const isExpanded = expandedEntityId === entity.id;
              const languages = getLanguagesForEntity(entity.id);
              const mediaTypes = getMediaTypesForEntity(entity.id);
              return (
                <>
                  <tr key={entity.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="px-2 py-4">
                      <button
                        onClick={() => setExpandedEntityId(isExpanded ? null : entity.id)}
                        className="focus:outline-none"
                        aria-label={isExpanded ? "Réduire" : "Déplier"}
                      >
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-semibold">{entity.globalTitle}</td>
                    <td className="px-6 py-4">{(entity.categories || []).join(', ')}</td>
                    <td className="px-6 py-4">
                      {languages.length > 0
                        ? languages.map(code => LANGUAGES.find(l => l.code === code)?.name || code).join(', ')
                        : <span className="text-neutral-400">-</span>
                      }
                    </td>
                    <td className="px-6 py-4">
                      {mediaTypes.length > 0
                        ? mediaTypes.map(type => MEDIA_TYPE_LABELS[type]).join(', ')
                        : <span className="text-neutral-400">-</span>
                      }
                    </td>
                    <td className="px-6 py-4">
                      {/* Actions globales sur l'entité si besoin */}
                    </td>
                  </tr>
                  {/* Tableau détail */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={6} className="bg-neutral-50 px-0 py-0">
                        <div className="p-4">
                          <table className="w-full text-sm">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left">Titre de la version</th>
                                <th className="px-4 py-2 text-left">Langue</th>
                                <th className="px-4 py-2 text-left">Type de média</th>
                                <th className="px-4 py-2 text-left">Titre du support</th>
                                <th className="px-4 py-2 text-left">URL</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getVersionsForEntity(entity.id).map(version => 
                                getSupportsForVersion(version.id).map(support => 
                                  {
                                  return(
                                  <tr key={support.id}>
                                    <td className="px-4 py-2">{version.title}</td>
                                    <td className="px-4 py-2">
                                      {LANGUAGES.find(l => l.code === version.languageId)?.name || version.languageId}
                                    </td>
                                    <td className="px-4 py-2">{MEDIA_TYPE_LABELS[support.mediaType]}</td>
                                    <td className="px-4 py-2">{support.title || <span className="text-neutral-400">-</span>}</td>
                                    <td className="px-4 py-2">
                                      {support.mediaType === MediaType.VIDEO && support.url ? (
                                        <a href={support.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 flex items-center gap-1">
                                          <LinkIcon size={16} /> Vidéo
                                        </a>
                                      ) : (
                                        <span className="text-neutral-400">-</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                      <button
                                        onClick={() => handleEdit(support)}
                                        className="text-primary-600 hover:text-primary-800 p-2"
                                      >
                                        <Edit2 size={16} />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(support)}
                                        className="text-error hover:text-error/80 p-2"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                )})
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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
              <h2 className="text-xl font-bold">{editingSupport ? 'Modifier' : 'Ajouter'} des supports média</h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSupport(null);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>
            <MediaSupportForm
              entities={entities}
              mediaVersions={mediaVersions}
              initialData={editingSupport}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingSupport(null);
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MediaSupportPage;