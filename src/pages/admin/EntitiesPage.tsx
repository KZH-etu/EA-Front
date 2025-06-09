import { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EntityForm } from '../../components/admin/EntityForm';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useTagStore } from '../../stores/useTagStore';
import { Document } from '../../api/types/documents/documents';
import { CreateDocumentDto } from '../../api/types/documents/create-document.dto';

const EntitiesPage = () => {
  const { 
    items: entities, 
    loading: loadingEntities, 
    error: errorEntities, 
    hasFetched: hasFetchedEntities,
    fetchAll: fetchEntities, 
    create: addEntity, 
    update: updateEntity, 
    remove: deleteEntity 
  } = useDocumentStore();
  const { 
    items: tags, 
    loading: loadingTags,
    error: errorTags,
    hasFetched: hasFetchedTags,
    fetchAll: fetchTags 
  } = useTagStore();

  useEffect(() => {
      if(!hasFetchedEntities) fetchEntities();
      if(!hasFetchedTags) fetchTags();
    }, [hasFetchedEntities, hasFetchedTags, fetchEntities, fetchTags]);

  const [showForm, setShowForm] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sortField, setSortField] = useState('globalTitle');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field : string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette entité ?')) {
      await deleteEntity(id);
    }
  };

  const handleEdit = (entity: Document) => {
    setEditingEntity(entity);
    setShowForm(true);
  };

  const filteredEntities = entities.filter(entity =>
    entity.globalTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEntities = [...filteredEntities].sort((a, b) => {
    const aValue = (a as any)[sortField] || '';
    const bValue = (b as any)[sortField] || '';
    if (sortDirection === 'asc') return aValue.localeCompare(bValue);
    return bValue.localeCompare(aValue);
  });

  if (loadingEntities || loadingTags) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Entités</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingEntity(null);
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter
        </button>
      </div>

      {errorEntities  && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {errorEntities }
        </div>
      )}

      {errorTags  && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {errorTags}
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 w-full border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-6 py-3 text-left">
                <button
                  className="flex items-center text-sm font-medium text-neutral-500"
                  onClick={() => handleSort('globalTitle')}
                >
                  Titre
                  {sortField === 'globalTitle' && (
                    sortDirection === 'asc' ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">Catégories</th>
              <th className="px-6 py-3 text-left">Tags</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntities.map((entity) => {
            return(
              <tr key={entity.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="px-6 py-4">{entity.globalTitle}</td>
                <td className="px-6 py-4">
                  {(entity.categories || []).join(', ')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {entity.tags?.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded"
                      >
                        {tags.find(t => t.id == tag.id)?.translations.find(tr => tr.language == 'fr')?.title || 'Inconnu'}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(entity)}
                    className="text-primary-600 hover:text-primary-800 p-2"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(entity.id)}
                    className="text-error hover:text-error/80 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            )})}
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
                {editingEntity ? 'Modifier' : 'Créer'} un Média
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingEntity(null);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>

            <EntityForm
              tags={tags}
              initialData={editingEntity || null}
              onSubmit={async (entity) => {
                setSubmitting(true);
                try {
                  // Nettoyage des sous-objets pour enlever les id
                  const cleanMeta = (meta: any) => {
                    if (!meta) return undefined;
                    const { id, ...rest } = meta;
                    return rest;
                  };
                  const { id, bookMeta, sermonMeta, eventMeta, ...editEntity } = entity;
                  const payload = {
                    ...editEntity,
                    bookMeta: cleanMeta(bookMeta),
                    sermonMeta: cleanMeta(sermonMeta),
                    eventMeta: cleanMeta(eventMeta),
                  };
                  if (editingEntity) {
                    await updateEntity(id, payload);
                  } else {
                    await addEntity(payload as CreateDocumentDto);
                  }
                  setShowForm(false);
                  setEditingEntity(null);
                } catch (err) {
                  // Gérer l'erreur si besoin
                } finally {
                  setSubmitting(false);
                }
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingEntity(null);
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EntitiesPage;