import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Document } from '../../api/types/documents/documents';
import { DocumentVersion } from '../../api/types/document-versions/document-versions';
import { DocumentMedia, MediaType } from '../../api/types/document-media/document-media';

interface MediaSupportFormProps {
  entities: Document[];
  mediaVersions: DocumentVersion[];
  initialData?: DocumentMedia | null;
  onSubmit: (supports: Omit<DocumentMedia, 'id' | 'createdAt'>[]) => void;
  onCancel: () => void;
}

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
];

function isYoutubeUrl(url: string) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|shorts\/)?([a-zA-Z0-9_-]{11})([&?][^\s]*)?$/.test(url);
}

type FormFields = {
  textTitle?: string;
  textUrl?: string;
  audioTitle?: string;
  audioUrl?: string;
  videoTitle?: string;
  videoUrl: string;
};

export function MediaSupportForm({ entities, initialData, mediaVersions, onSubmit, onCancel }: MediaSupportFormProps) {
  const [entitySearch, setEntitySearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [selectedMediaVersionId, setSelectedMediaVersionId] = useState<string>('');
  // Ajout d'un état pour les fichiers (pour l'instant toujours null)
  const [textFile, setTextFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);


  // Champs pour chaque MediaType
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<FormFields>({
    defaultValues: initialData
      ? {
          textTitle: initialData.mediaType === MediaType.TEXT ? initialData.title : '',
          textUrl: initialData.mediaType === MediaType.TEXT ? initialData.url : '',
          audioTitle: initialData.mediaType === MediaType.AUDIO ? initialData.title : '',
          audioUrl: initialData.mediaType === MediaType.AUDIO ? initialData.url : '',
          videoTitle: initialData.mediaType === MediaType.VIDEO ? initialData.title : '',
          videoUrl: initialData.mediaType === MediaType.VIDEO ? initialData.url : '',
        }
      : {
          textTitle: '',
          textUrl: '',
          audioTitle: '',
          audioUrl: '',
          videoTitle: '',
          videoUrl: '',
        }
  });

  // Si initialData change (édition), on reset le formulaire
  useEffect(() => {
    if (initialData) {
      const version = mediaVersions.find(v => v.id === initialData.documentVersionId);
      setSelectedEntityId(version?.documentId ?? '');
      setSelectedMediaVersionId(version?.id ?? '');
      reset({
        textTitle: initialData.mediaType === MediaType.TEXT ? initialData.title : '',
        audioTitle: initialData.mediaType === MediaType.AUDIO ? initialData.title : '',
        videoTitle: initialData.mediaType === MediaType.VIDEO ? initialData.title : '',
        videoUrl: initialData.mediaType === MediaType.VIDEO ? initialData.url : '',
      });
    } else {
      setSelectedEntityId('');
      setSelectedMediaVersionId('');
      reset({
        textTitle: '',
        audioTitle: '',
        videoTitle: '',
        videoUrl: '',
      });
    }
  }, [initialData, mediaVersions, reset]);

  // Suggestions d'entités
  const filteredEntities = useMemo(() => {
    if (!entitySearch) return [];
    return entities.filter(e =>
      e.globalTitle.toLowerCase().includes(entitySearch.toLowerCase())
    );
  }, [entitySearch, entities]);

  // Versions filtrées pour l'entité sélectionnée
  const filteredVersions = useMemo(() => {
    if (!selectedEntityId) return [];
    return mediaVersions.filter(v => v.documentId === selectedEntityId);
  }, [selectedEntityId, mediaVersions]);

  // Validation globale
  const videoUrl = watch('videoUrl');
  const audioUrl = watch('audioUrl');
  const textUrl = watch('textUrl');
  const isVideoValid = !!selectedMediaVersionId && isYoutubeUrl(videoUrl);
  const isTextValid = !!selectedMediaVersionId && !!textUrl;
  const isAudioValid = !!selectedMediaVersionId && !!audioUrl;
  const isFormValid = isTextValid || isAudioValid || isVideoValid;


  return (
    <form
      onSubmit={handleSubmit((data) => {
        const supports: Omit<DocumentMedia, 'id' | 'createdAt'>[] = [];
        if (isTextValid) {
          supports.push({
            documentVersionId: selectedMediaVersionId,
            mediaType: MediaType.TEXT,
            url: data.textUrl || '',
            title: data.textTitle || '',
            updatedAt: new Date(),
          });
        }
        if (isAudioValid) {
          supports.push({
            documentVersionId: selectedMediaVersionId,
            mediaType: MediaType.AUDIO,
            url: data.audioUrl || '',
            title: data.audioTitle || '',
            updatedAt: new Date(),
          });
        }
        // Ajoute toujours la vidéo si valide
        if (isVideoValid) {
          supports.push({
            documentVersionId: selectedMediaVersionId,
            mediaType: MediaType.VIDEO,
            url: data.videoUrl,
            title: data.videoTitle || '',
            updatedAt: new Date(),
          });
        }
        onSubmit(supports);
      })}
      className="space-y-6"
    >
      {/* Sélection d'entité */}
      <div className="w-full relative">
        <label className="block font-medium mb-1">Document *</label>
        <input
          type="text"
          className="form-input w-full"
          placeholder="Rechercher un document..."
          value={
            selectedEntityId
              ? entities.find(e => e.id === selectedEntityId)?.globalTitle || ''
              : entitySearch
          }
          onChange={e => {
            setEntitySearch(e.target.value);
            setShowSuggestions(true);
            setSelectedEntityId('');
            setSelectedMediaVersionId('');
          }}
          onFocus={() => setShowSuggestions(true)}
          autoComplete="off"
          disabled={!!initialData}
        />
        {showSuggestions && entitySearch && (
          <div className="border rounded bg-white shadow absolute z-10 w-full max-h-40 overflow-y-auto">
            {filteredEntities.length > 0 ? (
              filteredEntities.map(entity => (
                <div
                  key={entity.id}
                  className="px-4 py-2 hover:bg-primary-50 cursor-pointer"
                  onClick={() => {
                    setSelectedEntityId(entity.id);
                    setEntitySearch(entity.globalTitle);
                    setShowSuggestions(false);
                  }}
                >
                  {entity.globalTitle}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-neutral-400">Aucun résultat</div>
            )}
          </div>
        )}
      </div>

      {/* Sélection de la MediaVersion */}
      {selectedEntityId && (
        <div>
          <label className="block font-medium mb-1">Version traduite *</label>
          <select
            className="form-input w-full"
            value={selectedMediaVersionId}
            onChange={e => setSelectedMediaVersionId(e.target.value)}
            disabled={!!initialData}
          >
            <option value="">Sélectionner une version</option>
            {filteredVersions.map(v => (
              <option key={v.id} value={v.id}>
                {v.title} ({LANGUAGES.find(l => l.code === v.languageId)?.label || v.languageId})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Partie TEXT */}
      <div className="border rounded p-4 mb-2">
        <div className="font-semibold mb-2">📘 Support Texte</div>
        <input
          className="form-input w-full mb-2"
          placeholder="URL du fichier texte (PDF, DOC, etc.)"
          {...register('textUrl')}
          defaultValue={initialData?.mediaType === MediaType.TEXT ? initialData.url : ''}
        />
        <input
          className="form-input w-full"
          placeholder="Titre du texte (optionnel)"
          {...register('textTitle')}
          defaultValue={initialData?.mediaType === MediaType.TEXT ? initialData.title : ''}
        />
      </div>

      {/* Partie AUDIO */}
      <div className="border rounded p-4 mb-2">
        <div className="font-semibold mb-2">🔊 Support Audio</div>
        <input
          className="form-input w-full mb-2"
          placeholder="URL du fichier audio (mp3, wav, etc.)"
          {...register('audioUrl')}
          defaultValue={initialData?.mediaType === MediaType.AUDIO ? initialData.url : ''}
        />
        <input
          className="form-input w-full"
          placeholder="Titre de l'audio (optionnel)"
          {...register('audioTitle')}
          defaultValue={initialData?.mediaType === MediaType.AUDIO ? initialData.title : ''}
        />
      </div>

      {/* Partie VIDEO */}
      <div className="border rounded p-4 mb-2">
        <div className="font-semibold mb-2">🎬 Support Vidéo</div>
        <input
          className="form-input w-full mb-2"
          placeholder="URL YouTube *"
          {...register('videoUrl', {
            required: 'URL requise',
            validate: value => isYoutubeUrl(value) || 'URL YouTube invalide'
          })}
          defaultValue={initialData?.mediaType === MediaType.VIDEO ? initialData.url : ''}
        />
        {errors.videoUrl && (
          <p className="text-error text-sm">{errors.videoUrl.message as string}</p>
        )}
        <input
          className="form-input w-full"
          placeholder="Titre de la vidéo (optionnel)"
          {...register('videoTitle')}
          defaultValue={initialData?.mediaType === MediaType.VIDEO ? initialData.title : ''}
        />
      </div>

      {/* Validation globale */}
      {!isFormValid && (
        <div className="text-error text-sm">
          Veuillez sélectionner une entité, une version traduite, et renseigner une URL valide pour au moins un support.
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn-primary" disabled={!isFormValid}>
          {initialData ? 'Enregistrer' : 'Créer les supports'}
        </button>
      </div>
    </form>
  );
}