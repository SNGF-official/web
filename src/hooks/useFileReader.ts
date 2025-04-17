import { useState, useCallback, useMemo } from 'react';
import { FileApi, GetFilesRequest, UploadFileRequest } from 'generated-client/apis/FileApi';
import { FileInfo } from '../../generated-client';

interface UseFileApiState {
  files: FileInfo[];
  file: FileInfo | undefined;
  downloadUrl: string | null;
  loading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<FileInfo | null>;
  getFileById: (fileId: string) => Promise<FileInfo | null>;
  getFiles: (params?: GetFilesRequest) => Promise<FileInfo[] | null>;
  downloadFileById: (fileId: string) => Promise<Blob | null>;
}

export const useFileApi = (): UseFileApiState => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [file, setFile] = useState<FileInfo | undefined>(undefined);
  const [downloadUrl,] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileApi = useMemo(() => new FileApi(), []);

  const uploadFile = useCallback(async (fileToUpload: File): Promise<FileInfo | null> => {
    setLoading(true);
    setError(null);
    try {
      const uploadRequest: UploadFileRequest = { fileToUpload };
      const uploadedFileInfo = await fileApi.uploadFile(uploadRequest);
      setLoading(false);
      return uploadedFileInfo;
    } catch (err: unknown) {
      setError(err.message || 'Failed to upload file.');
      setLoading(false);
      return null;
    }
  }, [fileApi]);

  const getFileById = useCallback(async (fileId: string): Promise<FileInfo | null> => {
    setLoading(true);
    setError(null);
    try {
      const fileInfo = await fileApi.getFile({ fileId });
      setFile(fileInfo);
      setLoading(false);
      return fileInfo;
    } catch (err: unknown) {
      setError(err.message || 'Failed to get file info.');
      setLoading(false);
      return null;
    }
  }, [fileApi]);

  const getFiles = useCallback(async (params?: GetFilesRequest): Promise<FileInfo[] | null> => {
    setLoading(true);
    setError(null);
    try {
      const fileList = await fileApi.getFiles(params);
      setFiles(fileList);
      setLoading(false);
      return fileList;
    } catch (err: unknown) {
      setError(err.message || 'Failed to get files.');
      setLoading(false);
      return null;
    }
  }, [fileApi]);

  const downloadFileById = useCallback(async (fileId: string): Promise<Blob | null> => {
    setLoading(true);
    setError(null);
    try {
      const blob = await fileApi.downloadFile({ fileId });
      setLoading(false);
      return blob;
    } catch (err: unknown) {
      setError(err.message || 'Failed to download file.');
      setLoading(false);
      return null;
    }
  }, [fileApi]);

  return {
    files,
    file,
    downloadUrl,
    loading,
    error,
    uploadFile,
    getFileById,
    getFiles,
    downloadFileById,
  };
};