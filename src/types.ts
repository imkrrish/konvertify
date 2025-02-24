export type IFile = {
  id: string;
  file: File;
  file_name: string;
  file_size: number;
  from: string;
  to: string | null;
  file_type: string;
  is_converting?: boolean;
  is_converted?: boolean;
  is_error?: boolean;
  url?: string;
  output?: string;
};
