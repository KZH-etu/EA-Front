import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import TagSelector from '../ui/TagSelector';
import { Document, DocumentCategory, EventType } from '../../api/types/documents/documents';
import { Tag } from '../../api/types/tags/tags';
import { CreateDocumentDto, UpdateDocumentDto } from '../../api/types/documents/create-document.dto';

interface EntityFormProps {
  tags: Tag[];
  initialData?: CreateDocumentDto| null;
  onSubmit: (entity: UpdateDocumentDto) => void;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  { value: DocumentCategory.BOOK, label: 'Livre' },
  { value: DocumentCategory.EVENT, label: 'Événement' },
  { value: DocumentCategory.SERMON, label: 'Sermon' }
];

const EVENT_TYPE_OPTIONS = [
  { value: EventType.CONVENTION, label: 'Conférence' },
  { value: EventType.SEMINAR, label: 'Séminaire' },
  { value: EventType.PRAYER, label: 'Réunion' }
];

export function EntityForm({ tags, initialData, onSubmit, onCancel }: EntityFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset, // <--- ajoute reset
    formState: { errors }
  } = useForm<UpdateDocumentDto>({
    defaultValues: initialData || {
      globalTitle: '',
      categories: [],
      tagIds: [],
      bookMeta: undefined,
      sermonMeta: undefined,
      eventMeta: undefined
    }
  });

  const selectedCategories = watch('categories') || [];
  const selectedTags = watch('tagIds') || [];

  // Génère un UUID à la création
  useEffect(() => {
    if (initialData) {
      // Nettoie les id dans les sous-objets
      const cleanMeta = (meta: any) => {
        if (!meta) return undefined;
        const { id, ...rest } = meta;
        return rest;
      };
      reset({
        ...initialData,
        bookMeta: cleanMeta(initialData.bookMeta),
        sermonMeta: cleanMeta(initialData.sermonMeta),
        eventMeta: cleanMeta(initialData.eventMeta),
      });
    }
  }, [initialData, setValue, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // Nettoie les métadonnées non utilisées
        if (!selectedCategories.includes(DocumentCategory.BOOK)) delete data.bookMeta;
        if (!selectedCategories.includes(DocumentCategory.SERMON)) delete data.sermonMeta;
        if (!selectedCategories.includes(DocumentCategory.EVENT)) delete data.eventMeta;

        onSubmit(data);
        
      })}
      className="space-y-6"
    >
      <div>
        <label className="block font-medium mb-1">Titre global *</label>
        <input
          className="form-input w-full"
          {...register('globalTitle', { required: 'Le titre est requis' })}
        />
        {errors.globalTitle && <p className="text-error text-sm">{errors.globalTitle.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Catégories *</label>
        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <div className="flex gap-4">
              {CATEGORY_OPTIONS.map(opt => (
                <label key={opt.value} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={field.value?.includes(opt.value)}
                    onChange={e => {
                      const checked = e.target.checked;
                      if (checked) field.onChange([...(field.value || []), opt.value]);
                      else field.onChange((field.value || []).filter((v: string) => v !== opt.value));
                    }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          )}
        />
        {errors.categories && <p className="text-error text-sm">Sélectionnez au moins une catégorie</p>}
      </div>

      <div>
        <label htmlFor="tags" className="block font-medium text-neutral-700 mb-1">
          Tags *
        </label>
        <TagSelector
          availableTags={tags}
          selectedTags={selectedTags}
          onChange={(newTags) => setValue('tagIds', newTags)}
          placeholder="Sélectionner des tags"
        />
      </div>

      {/* BOOK */}
      {selectedCategories.includes(DocumentCategory.BOOK) && (
        <fieldset className="border rounded p-4">
          <legend className="font-semibold">Livre</legend>
          <div>
            <label className="block font-medium mb-1">Auteur *</label>
            <input
              className="form-input w-full"
              {...register('bookMeta.author', {
                required: 'Auteur requis'
              })}
            />
            {errors.bookMeta?.author && (
              <p className="text-error text-sm">{errors.bookMeta.author.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Date de publication</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('bookMeta.publishedAt')}
            />
          </div>
        </fieldset>
      )}

      {/* SERMON */}
      {selectedCategories.includes(DocumentCategory.SERMON) && (
        <fieldset className="border rounded p-4">
          <legend className="font-semibold">Sermon</legend>
          <div>
            <label className="block font-medium mb-1">Prédicateur *</label>
            <input
              className="form-input w-full"
              {...register('sermonMeta.preacher', {
                required: 'Prédicateur requis'
              })}
            />
            {errors.sermonMeta?.preacher && (
              <p className="text-error text-sm">{errors.sermonMeta.preacher.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Date de prédication *</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('sermonMeta.preachedAt', {
                required: 'Date requise',
                valueAsDate: true
              })}
            />
            {errors.sermonMeta?.preachedAt && (
              <p className="text-error text-sm">{errors.sermonMeta.preachedAt.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Lieu</label>
            <input
              className="form-input w-full"
              {...register('sermonMeta.location')}
            />
          </div>
        </fieldset>
      )}

      {/* EVENT */}
      {selectedCategories.includes(DocumentCategory.EVENT) && (
        <fieldset className="border rounded p-4">
          <legend className="font-semibold">Événement</legend>
          <div>
            <label className="block font-medium mb-1">Type *</label>
            <Controller
              control={control}
              name="eventMeta.type"
              rules={{ required: 'Type requis' }}
              render={({ field }) => (
                <select className="form-input w-full" {...field}>
                  <option value="">Sélectionner...</option>
                  {EVENT_TYPE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
            />
            {errors.eventMeta?.type && typeof errors.eventMeta.type === 'object' && 'message' in errors.eventMeta.type && (
              <p className="text-error text-sm">{errors.eventMeta.type.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Début *</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('eventMeta.startTime', {
                required: 'Début requis',
                valueAsDate: true
              })}
            />
            {errors.eventMeta?.startTime && (
              <p className="text-error text-sm">{errors.eventMeta.startTime.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Fin</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('eventMeta.endTime', { valueAsDate: true })}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Lieu</label>
            <input
              className="form-input w-full"
              {...register('eventMeta.location')}
            />
          </div>
        </fieldset>
      )}

      <div className="flex justify-end gap-4">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn-primary">
          {initialData ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
}
