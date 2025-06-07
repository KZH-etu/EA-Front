import { ContentTranslations } from "../../lib/interfacesData";
import { Books } from "../../stores/useBooksStore";
import { Entity } from "../../stores/useEntitiesStore";
import { MediaSupport, MediaType } from "../../stores/useMediaSupportStore";
import { MediaVersion } from "../../stores/useMediaVersionStore";
import { Sermon } from "../../stores/useSermonsStore";

interface MappingProps {
  entities: Entity[];
  versions: MediaVersion[];
  medias: MediaSupport[];
}


export const mapSermons = ({ entities, versions, medias }: MappingProps): Sermon[] => {
  console.log('mapSermons called', { entities, versions, medias });
  return entities.flatMap(entity => {
    const entityVersions = versions.filter(v => v.documentId === entity.id);
    const entityMedias = entityVersions.flatMap(v => medias.filter(m => m.documentVersionId === v.id));

    console.log('entityMedias', entityMedias);

    // Génère un sermon audio si au moins un mediaType AUDIO
    const sermons: Sermon[] = [];

    if (entityMedias.some(m => m.mediaType === MediaType.AUDIO)) {
      const availableLanguages = [...new Set(entityVersions.map(v => v.languageId))];
      const translations: ContentTranslations[] = entityVersions.map(v => ({
        lang: v.languageId,
        title: v.title,
        description: v.description || '',
        url: entityMedias.find(m => m.documentVersionId === v.id && m.mediaType === MediaType.AUDIO)?.url || '',
      }));
      sermons.push({
        id: entity.id,
        preacher: entity.sermonMetadata?.preacher || '',
        date: entity.sermonMetadata?.preachedAt?.toISOString?.() || '',
        type: MediaType.AUDIO,
        duration: '',
        tags: entity.tagIds || [],
        availableLanguages,
        language: entityVersions[0]?.languageId || '',
        location: entity.sermonMetadata?.location || '',
        translations,
      } as Sermon);
    }

    // Génère un sermon vidéo si au moins un mediaType VIDEO
    if (entityMedias.some(m => m.mediaType === MediaType.VIDEO)) {
      const availableLanguages = [...new Set(entityVersions.map(v => v.languageId))];
      const translations: ContentTranslations[] = entityVersions.map(v => ({
        lang: v.languageId,
        title: v.title,
        description: v.description || '',
        url: entityMedias.find(m => m.documentVersionId === v.id && m.mediaType === MediaType.VIDEO)?.url || '',
      }));
      sermons.push({
        id: entity.id,
        preacher: entity.sermonMetadata?.preacher || '',
        date: entity.sermonMetadata?.preachedAt || '',
        type: MediaType.VIDEO,
        duration: '',
        tags: entity.tagIds || [],
        availableLanguages,
        language: entityVersions[0]?.languageId || '',
        location: entity.sermonMetadata?.location || '',
        translations,
      } as Sermon);
    }

    console.log('Mapped sermons for entity', entity.id, sermons);
    return sermons;
  });
};

export const mapBooks = ({ entities, versions, medias }: MappingProps): Books[] => {
  return entities
    .map(entity => {
      const entityVersions = versions.filter(v => v.documentId === entity.id);
      const entityMedias = entityVersions.flatMap(v => medias.filter(m => m.documentVersionId === v.id));
      // Un book doit avoir au moins un mediaType TEXT
      if (!entityMedias.some(m => m.mediaType === MediaType.TEXT)) return null;

      // Récupère toutes les langues disponibles
      const availableLanguages = [...new Set(entityVersions.map(v => v.languageId))];

      // Récupère la langue principale (première version trouvée)
      const language = entityVersions[0]?.languageId || '';

      // Récupère les tags
      const tags = entity.tagIds || [];

      // Récupère les traductions
      const translations: ContentTranslations[] = entityVersions.map(v => ({
        lang: v.languageId,
        title: v.title,
        description: v.description || '',
        url: entityMedias.find(m => m.documentVersionId === v.id && m.mediaType === MediaType.TEXT)?.url || '',
      }));

      return {
        id: entity.id,
        author: entity.bookMetadata?.author || '',
        category: MediaType.TEXT,
        year: entity.bookMetadata?.publishAt?.getFullYear?.() || 0,
        coverUrl: '',
        tags,
        availableLanguages,
        language,
        translations,
      } as Books;
    })
    .filter(Boolean) as Books[];
};