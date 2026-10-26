const STORAGE_LICENSE_KEY = 'fedrefine_license_key';
const STORAGE_LICENSE_STATUS = 'fedrefine_license_status';

export interface LicenseInfo {
  key: string;
  savedAt: number | null;
  isValid: boolean;
}

export const getStoredLicenseKey = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_LICENSE_KEY) || '';
};

export const saveLicenseKey = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  const trimmed = key.trim();
  if (!trimmed) {
    localStorage.removeItem(STORAGE_LICENSE_KEY);
    localStorage.removeItem(STORAGE_LICENSE_STATUS);
    return false;
  }
  localStorage.setItem(STORAGE_LICENSE_KEY, trimmed);
  localStorage.setItem(STORAGE_LICENSE_STATUS, 'active');
  return true;
};

export const clearStoredLicenseKey = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_LICENSE_KEY);
  localStorage.removeItem(STORAGE_LICENSE_STATUS);
};

export const hasActiveLicense = (): boolean => {
  if (typeof window === 'undefined') return false;
  const key = localStorage.getItem(STORAGE_LICENSE_KEY);
  return Boolean(key && key.trim().length >= 4);
};
