import { Close } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRef, useState } from 'react';
import uploadIcon from '../../../public/upload_icon.png';
import styles from './DragDropFile.module.sass';

export interface IDragDropFile {
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
  fileName: string | null;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const DragDropFile: React.FC<IDragDropFile> = ({
  setPreviewUrl,
  fileName,
  setFileName,
  setFile,
}) => {
  // ref
  const inputRef = useRef<any>(null);
  // drag state
  const [dragActive, setDragActive] = useState<boolean>(false);

  // handle drag events
  const handleDrag = function (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
    type: string;
  }) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
      setPreviewUrl(URL.createObjectURL(e.dataTransfer.files[0]));
    }
    return false;
  };

  // triggers when file is selected with click
  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Box className={styles.formFileUpload}>
      {fileName && (
        <Box
          sx={{ position: 'relative' }}
          onClick={() => {
            setFileName(null);
            setFile(null);
            setPreviewUrl('');
          }}
        >
          <Close
            sx={{
              fontSize: '12px',
              position: 'absolute',
              right: '-12px',
              top: '-9px',
              cursor: 'pointer',
            }}
          />
          <Box>{fileName}</Box>
        </Box>
      )}
      <form
        id="formFileUpload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        {!fileName && (
          <Image src={uploadIcon} alt={'upload'} width={26} height={21} />
        )}
        <input
          ref={inputRef}
          type="file"
          id="inputFileUpload"
          accept="image/*"
          className={styles.inputFileUpload}
          multiple={true}
          onChange={(e) => {
            if (handleChange) handleChange(e);
          }}
        />
        <label
          id="labelFileUpload"
          htmlFor="inputFileUpload"
          className={
            dragActive ? `${styles.labelFileUpload} ${styles.dragActive}` : ''
          }
        >
          {!fileName && (
            <Box>
              <button className={styles.uploadButton} onClick={onButtonClick}>
                <span className={styles.textBold}>Click to upload</span>{' '}
                <span>or drag and drop</span>
              </button>
              <Box className={styles.uploadButton}>
                {' '}
                <span>SVG, PNG or JPG</span>
              </Box>
            </Box>
          )}
        </label>
        {dragActive && (
          <div
            id="dragFileElement"
            className={styles.dragFileElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              if (handleDrop) handleDrop(e);
            }}
          ></div>
        )}
      </form>
    </Box>
  );
};

export default DragDropFile;
