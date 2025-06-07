import { useCallback } from 'react';
import { ContentTranslations } from '../lib/interfacesData';
import { useAboutData } from '../hooks/useData';

interface AboutSection {
  id: string;
  entity: string;
  mainImage?: string;
  order: number;
  isIntro: boolean;
  links?: Array<{ text: string; url: string; }>;
  translations: ContentTranslations[];
}

interface AboutDetail {
  id: string;
  sectionId: string;
  translations: ContentTranslations[];
  order: number;
}

interface AboutStore {
  sections: AboutSection[];
  details: AboutDetail[];
  loading: boolean;
  error: string | null;
  addSection: (section: Omit<AboutSection, 'id'>, imageFile?: File) => Promise<void>;
  updateSection: (id: string, section: Partial<AboutSection>, imageFile?: File) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;
  addDetail: (detail: Omit<AboutDetail, 'id'>) => Promise<void>;
  updateDetail: (id: string, detail: Partial<AboutDetail>) => Promise<void>;
  deleteDetail: (id: string) => Promise<void>;
  reorderSections: (sections: AboutSection[]) => Promise<void>;
  reorderDetails: (details: AboutDetail[]) => Promise<void>;
}

export const useAboutStore = (): AboutStore => {
  const { aboutSections, aboutDetails, loading, error, addItem, updateItem, deleteItem, reorderItems } = useAboutData();

  const addSection = useCallback(async (section: Omit<AboutSection, 'id'>, imageFile?: File) => {
    try {
      const newSection = {
        ...section,
        mainImage: imageFile ? URL.createObjectURL(imageFile) : undefined
      };
      await addItem('aboutSections', newSection);
    } catch (error) {
      throw new Error('Failed to add section');
    }
  }, [addItem]);

  const updateSection = useCallback(async (id: string, section: Partial<AboutSection>, imageFile?: File) => {
    try {
      const updatedSection = {
        ...section,
        mainImage: imageFile ? URL.createObjectURL(imageFile) : section.mainImage
      };
      await updateItem('aboutSections', id, updatedSection);
    } catch (error) {
      throw new Error('Failed to update section');
    }
  }, [updateItem]);

  const deleteSection = useCallback(async (id: string) => {
    try {
      await deleteItem('aboutSections', id);
      await Promise.all(
        aboutDetails
          .filter(detail => detail.sectionId === id)
          .map(detail => deleteItem('aboutDetails', detail.id))
      );
    } catch (error) {
      throw new Error('Failed to delete section');
    }
  }, [aboutDetails, deleteItem]);

  const addDetail = useCallback(async (detail: AboutDetail) => {
    try {
      const fixedDetail = {
        ...detail,
        translations: detail.translations.map(t => ({
          ...t,
          description: t.description ?? [] as string[]
        }))
      };
      await addItem('aboutDetails', fixedDetail);
    } catch (error) {
      throw new Error('Failed to add detail');
    }
  }, [addItem]);

  const updateDetail = useCallback(async (id: string, detail: Partial<AboutDetail>) => {
    try {
      const fixedDetail = {
        ...detail,
        translations: detail.translations
          ? detail.translations.map(t => ({
              ...t,
              description: Array.isArray(t.description)
                ? t.description.join('\n')
                : t.description ?? ''
            }))
          : undefined
      };
      await updateItem('aboutDetails', id, fixedDetail);
    } catch (error) {
      throw new Error('Failed to update detail');
    }
  }, [updateItem]);

  const deleteDetail = useCallback(async (id: string) => {
    try {
      await deleteItem('aboutDetails', id);
    } catch (error) {
      throw new Error('Failed to delete detail');
    }
  }, [deleteItem]);

  const reorderSections = useCallback(async (sections: AboutSection[]) => {
    try {
      await reorderItems('aboutSections', sections);
    } catch (error) {
      throw new Error('Failed to reorder sections');
    }
  }, [reorderItems]);

  const reorderDetails = useCallback(async (details: AboutDetail[]) => {
    try {
      const fixedDetails = details.map(detail => ({
        ...detail,
        translations: detail.translations.map(t => ({
          ...t,
          description: Array.isArray(t.description)
            ? t.description.join('\n')
            : t.description ?? ''
        }))
      }));
      await reorderItems('aboutDetails', fixedDetails);
    } catch (error) {
      throw new Error('Failed to reorder details');
    }
  }, [reorderItems]);

  return {
    sections: aboutSections,
    details: aboutDetails,
    loading,
    error,
    addSection,
    updateSection,
    deleteSection,
    addDetail,
    updateDetail,
    deleteDetail,
    reorderSections,
    reorderDetails
  };
};