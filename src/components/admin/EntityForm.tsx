import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import TagSelector from '../ui/TagSelector';
import { Tags } from '../../stores/useTagsStore';
import { Entity } from '../../stores/useEntitiesStore';

type EventType = 'CONFERENCE' | 'SEMINAR' | 'MEETING'; // adapte selon ton projet

interface EntityFormProps {
  tags: Tags[];
  initialData?: Entity | null;
  onSubmit: (entity: Entity) => void;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  { value: 'Livre', label: 'Livre' },
  { value: 'Événement', label: 'Événement' },
  { value: 'Sermon', label: 'Sermon' }
];

const EVENT_TYPE_OPTIONS = [
  { value: 'CONFERENCE', label: 'Conférence' },
  { value: 'SEMINAR', label: 'Séminaire' },
  { value: 'MEETING', label: 'Réunion' }
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
  } = useForm<Entity>({
    defaultValues: initialData || {
      globalTitle: '',
      categories: [],
      tagIds: [],
      bookMetadata: undefined,
      sermonMetadata: undefined,
      eventMetadata: undefined
    }
  });

  const selectedCategories = watch('categories') || [];
  const selectedTags = watch('tagIds') || [];

  // Génère un UUID à la création
  useEffect(() => {
    if (initialData) reset(initialData);
    if (!initialData) {setValue('id', uuidv4()); };
  }, [initialData, setValue, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // Ajoute l'id si création
        if (!data.id) data.id = uuidv4();

        // Nettoie les métadonnées non utilisées
        if (!selectedCategories.includes('Livre')) delete data.bookMetadata;
        if (!selectedCategories.includes('Sermon')) delete data.sermonMetadata;
        if (!selectedCategories.includes('Événement')) delete data.eventMetadata;

        onSubmit(data);
      })}
      className="space-y-6"
    >
      <input type="hidden" {...register('id')} />

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
      {selectedCategories.includes('Livre') && (
        <fieldset className="border rounded p-4">
          <legend className="font-semibold">Livre</legend>
          <input type="hidden" {...register('bookMetadata.id')} value={watch('id')} />
          <div>
            <label className="block font-medium mb-1">Auteur *</label>
            <input
              className="form-input w-full"
              {...register('bookMetadata.author', {
                required: 'Auteur requis'
              })}
            />
            {errors.bookMetadata?.author && (
              <p className="text-error text-sm">{errors.bookMetadata.author.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Date de publication</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('bookMetadata.plublishAt')}
            />
          </div>
        </fieldset>
      )}

      {/* SERMON */}
      {selectedCategories.includes('Sermon') && (
        <fieldset className="border rounded p-4">
          <legend className="font-semibold">Sermon</legend>
          <input type="hidden" {...register('sermonMetadata.id')} value={watch('id')} />
          <div>
            <label className="block font-medium mb-1">Prédicateur *</label>
            <input
              className="form-input w-full"
              {...register('sermonMetadata.preacher', {
                required: 'Prédicateur requis'
              })}
            />
            {errors.sermonMetadata?.preacher && (
              <p className="text-error text-sm">{errors.sermonMetadata.preacher.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Date de prédication *</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('sermonMetadata.preachedAt', {
                required: 'Date requise',
                valueAsDate: true
              })}
            />
            {errors.sermonMetadata?.preachedAt && (
              <p className="text-error text-sm">{errors.sermonMetadata.preachedAt.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Lieu</label>
            <input
              className="form-input w-full"
              {...register('sermonMetadata.location')}
            />
          </div>
        </fieldset>
      )}

      {/* EVENT */}
      {selectedCategories.includes('Événement') && (
        <fieldset className="border rounded p-4">
          <legend className="font-semibold">Événement</legend>
          <input type="hidden" {...register('eventMetadata.id')} value={watch('id')} />
          <div>
            <label className="block font-medium mb-1">Type *</label>
            <Controller
              control={control}
              name="eventMetadata.type"
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
            {errors.eventMetadata?.type && (
              <p className="text-error text-sm">{errors.eventMetadata.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Début *</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('eventMetadata.startTime', {
                required: 'Début requis',
                valueAsDate: true
              })}
            />
            {errors.eventMetadata?.startTime && (
              <p className="text-error text-sm">{errors.eventMetadata.startTime.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Fin</label>
            <input
              type="datetime-local"
              className="form-input w-full"
              {...register('eventMetadata.endTime', { valueAsDate: true })}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Lieu</label>
            <input
              className="form-input w-full"
              {...register('eventMetadata.location')}
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
