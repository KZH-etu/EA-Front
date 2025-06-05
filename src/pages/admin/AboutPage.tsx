import { useState, useRef } from 'react';
import { useAboutStore } from '../../stores/useAboutStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Plus, 
  Edit2, 
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  X,
  Save,
  Info,
  Link as LinkIcon
} from 'lucide-react';

interface Section {
  id: string;
  entity: 'assemblee' | 'branham' | 'frank';
  title: string;
  shortDescription: string;
  mainImage?: string;
  order: number;
  isIntro: boolean;
}

interface Detail {
  id: string;
  sectionId: string;
  title: string;
  content: string;
  order: number;
}

const AboutPage = () => {
  const { sections, details, loading, error, addSection, updateSection, deleteSection, addDetail, updateDetail, deleteDetail, reorderSections, reorderDetails } = useAboutStore();
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingDetail, setEditingDetail] = useState<Detail | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<'assemblee' | 'branham' | 'frank'>('assemblee');
  const [imageUrl, setImageUrl] = useState('');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === 'section') {
      const reorderedSections = Array.from(sections);
      const [removed] = reorderedSections.splice(source.index, 1);
      reorderedSections.splice(destination.index, 0, removed);
      reorderSections(reorderedSections);
    } else if (type === 'detail') {
      const sectionDetails = details.filter(d => d.sectionId === expandedSection);
      const reorderedDetails = Array.from(sectionDetails);
      const [removed] = reorderedDetails.splice(source.index, 1);
      reorderedDetails.splice(destination.index, 0, removed);
      reorderDetails(reorderedDetails);
    }
  };

  const handleSectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const sectionData = {
      entity: selectedEntity,
      title: formData.get('title') as string,
      shortDescription: formData.get('shortDescription') as string,
      mainImage: imageUrl || undefined,
      order: sections.length,
      isIntro: formData.get('isIntro') === 'true'
    };

    try {
      if (editingSection) {
        await updateSection(editingSection.id, sectionData);
      } else {
        await addSection(sectionData);
      }
      setShowSectionForm(false);
      setEditingSection(null);
      setImageUrl('');
    } catch (error) {
      console.error('Failed to save section:', error);
    }
  };

  const handleDetailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const detailData = {
      sectionId: expandedSection!,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      order: details.filter(d => d.sectionId === expandedSection).length
    };

    try {
      if (editingDetail) {
        await updateDetail(editingDetail.id, detailData);
      } else {
        await addDetail(detailData);
      }
      setShowDetailForm(false);
      setEditingDetail(null);
    } catch (error) {
      console.error('Failed to save detail:', error);
    }
  };

  const getEntityName = (entity: string) => {
    switch (entity) {
      case 'assemblee':
        return 'Assemblée';
      case 'branham':
        return 'William Branham';
      case 'frank':
        return 'Ewald Frank';
      default:
        return entity;
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
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Pages "À Propos"</h1>
          <p className="text-neutral-600 mt-1">Gérez le contenu des différentes sections</p>
        </div>
        <button
          className="btn-primary w-full md:w-auto"
          onClick={() => {
            setShowSectionForm(true);
            setEditingSection(null);
            setImageUrl('');
          }}
        >
          <Plus size={20} className="mr-2" />
          Ajouter une Section
        </button>
      </div>

      {error && (
        <div className="bg-error/10 border-l-4 border-error text-error p-4 mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {(['assemblee', 'branham', 'frank'] as const).map((entity) => (
              <button
                key={entity}
                className={`px-4 py-3 rounded-md flex-1 md:flex-none transition-colors ${
                  selectedEntity === entity
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                onClick={() => setSelectedEntity(entity)}
              >
                {getEntityName(entity)}
              </button>
            ))}
          </div>

          <div className="bg-neutral-50 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Info size={20} className="text-primary-500 flex-shrink-0 mt-1" />
            <div className="text-sm text-neutral-600">
              <p className="font-medium mb-1">Instructions :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Utilisez le glisser-déposer pour réorganiser les sections et les détails</li>
                <li>Les sections d'introduction peuvent avoir une image principale</li>
                <li>Chaque section peut contenir plusieurs détails</li>
              </ul>
            </div>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections" type="section">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {sections
                    .filter(section => section.entity === selectedEntity)
                    .map((section, index) => (
                      <Draggable
                        key={section.id}
                        draggableId={section.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="bg-white rounded-lg border border-neutral-200 overflow-hidden"
                          >
                            <div className="p-4">
                              <div className="flex items-start gap-3">
                                <div
                                  {...provided.dragHandleProps}
                                  className="mt-1 text-neutral-400 hover:text-neutral-600 cursor-move touch-none"
                                >
                                  <GripVertical size={20} />
                                </div>
                                <div className="flex-grow">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                      <h3 className="text-lg font-semibold flex flex-wrap items-center gap-2">
                                        {section.title}
                                        {section.isIntro && (
                                          <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                            Introduction
                                          </span>
                                        )}
                                      </h3>
                                      <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                                        {section.shortDescription}
                                      </p>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => {
                                          setEditingSection(section);
                                          setImageUrl(section.mainImage || '');
                                          setShowSectionForm(true);
                                        }}
                                        className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-md"
                                      >
                                        <Edit2 size={18} />
                                      </button>
                                      <button
                                        onClick={() => deleteSection(section.id)}
                                        className="p-2 text-error hover:text-error/80 hover:bg-error/10 rounded-md"
                                      >
                                        <Trash2 size={18} />
                                      </button>
                                      <button
                                        onClick={() => setExpandedSection(
                                          expandedSection === section.id ? null : section.id
                                        )}
                                        className="p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-md"
                                      >
                                        {expandedSection === section.id ? (
                                          <ChevronUp size={18} />
                                        ) : (
                                          <ChevronDown size={18} />
                                        )}
                                      </button>
                                    </div>
                                  </div>

                                  {section.mainImage && (
                                    <div className="mt-4">
                                      <img
                                        src={section.mainImage}
                                        alt={section.title}
                                        className="w-full max-w-md rounded-lg shadow-sm"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {expandedSection === section.id && (
                                <div className="mt-6 pt-6 border-t border-neutral-200">
                                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                    <h4 className="font-medium">Détails de la section</h4>
                                    <button
                                      className="btn-secondary text-sm w-full md:w-auto"
                                      onClick={() => {
                                        setShowDetailForm(true);
                                        setEditingDetail(null);
                                      }}
                                    >
                                      <Plus size={16} className="mr-2" />
                                      Ajouter un détail
                                    </button>
                                  </div>

                                  <Droppable droppableId={`details-${section.id}`} type="detail">
                                    {(provided) => (
                                      <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="space-y-3"
                                      >
                                        {details
                                          .filter(detail => detail.sectionId === section.id)
                                          .map((detail, index) => (
                                            <Draggable
                                              key={detail.id}
                                              draggableId={detail.id}
                                              index={index}
                                            >
                                              {(provided) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  className="bg-neutral-50 p-4 rounded-lg border border-neutral-200"
                                                >
                                                  <div className="flex items-start gap-3">
                                                    <div
                                                      {...provided.dragHandleProps}
                                                      className="mt-1 text-neutral-400 hover:text-neutral-600 cursor-move touch-none"
                                                    >
                                                      <GripVertical size={16} />
                                                    </div>
                                                    <div className="flex-grow">
                                                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                        <div>
                                                          <h5 className="font-medium">
                                                            {detail.title}
                                                          </h5>
                                                          <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                                                            {detail.content}
                                                          </p>
                                                        </div>
                                                        
                                                        <div className="flex items-center space-x-2">
                                                          <button
                                                            onClick={() => {
                                                              setEditingDetail(detail);
                                                              setShowDetailForm(true);
                                                            }}
                                                            className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-md"
                                                          >
                                                            <Edit2 size={16} />
                                                          </button>
                                                          <button
                                                            onClick={() => deleteDetail(detail.id)}
                                                            className="p-2 text-error hover:text-error/80 hover:bg-error/10 rounded-md"
                                                          >
                                                            <Trash2 size={16} />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </Draggable>
                                          ))}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Section Form Modal */}
      {showSectionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingSection ? 'Modifier la Section' : 'Nouvelle Section'}
              </h2>
              <button
                onClick={() => {
                  setShowSectionForm(false);
                  setEditingSection(null);
                  setImageUrl('');
                }}
                className="text-neutral-500 hover:text-neutral-700 p-2 hover:bg-neutral-100 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSectionSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Type de Section
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors flex-1">
                    <input
                      type="radio"
                      name="isIntro"
                      value="true"
                      defaultChecked={editingSection?.isIntro}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">Introduction</span>
                      <p className="text-sm text-neutral-600 mt-1">
                        Section principale avec image
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors flex-1">
                    <input
                      type="radio"
                      name="isIntro"
                      value="false"
                      defaultChecked={editingSection ? !editingSection.isIntro : true}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">Contenu</span>
                      <p className="text-sm text-neutral-600 mt-1">
                        Section de détails
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={editingSection?.title}
                  className="form-input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="shortDescription" className="block text-sm font-medium text-neutral-700 mb-2">
                  Description courte
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  defaultValue={editingSection?.shortDescription}
                  className="form-input w-full"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-700 mb-2">
                  Lien vers l'image (URL)
                  <span className="text-neutral-500 font-normal ml-2">
                    (uniquement pour les sections d'introduction)
                  </span>
                </label>
                <div className="relative">
                  <LinkIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="form-input w-full pl-10"
                  />
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-neutral-600 mb-2">Aperçu de l'image :</p>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-h-48 rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-neutral-200 -mx-6 -mb-6 p-6 flex flex-col md:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowSectionForm(false);
                    setEditingSection(null);
                    setImageUrl('');
                  }}
                  className="btn-outline w-full md:w-auto"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary w-full md:w-auto">
                  <Save size={18} className="mr-2" />
                  {editingSection ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Form Modal */}
      {showDetailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingDetail ? 'Modifier le Détail' : 'Nouveau Détail'}
              </h2>
              <button
                onClick={() => {
                  setShowDetailForm(false);
                  setEditingDetail(null);
                }}
                className="text-neutral-500 hover:text-neutral-700 p-2 hover:bg-neutral-100 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleDetailSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={editingDetail?.title}
                  className="form-input w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-2">
                  Contenu
                </label>
                <textarea
                  id="content"
                  name="content"
                  defaultValue={editingDetail?.content}
                  className="form-input w-full"
                  rows={6}
                  required
                />
              </div>

              <div className="sticky bottom-0 bg-white border-t border-neutral-200 -mx-6 -mb-6 p-6 flex flex-col md:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDetailForm(false);
                    setEditingDetail(null);
                  }}
                  className="btn-outline w-full md:w-auto"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary w-full md:w-auto">
                  <Save size={18} className="mr-2" />
                  {editingDetail ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;