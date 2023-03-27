import { Close } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import styles from './DragDropFile.module.sass';

export interface IDragDropFiles {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  filesNames: string[] | null;
  setFilesNames: React.Dispatch<React.SetStateAction<string[] | null>>;
  certificateUrl: string[];
  setDeletedFilesNames: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const DragDropFiles: React.FC<IDragDropFiles> = ({
  files,
  setFiles,
  filesNames,
  setFilesNames,
  certificateUrl,
  setDeletedFilesNames,
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
      setFiles((prevFiles) => [...prevFiles, e.dataTransfer.files[0]]);
      setFilesNames((prevName) => {
        if (prevName) {
          return [...prevName, e.dataTransfer.files[0].name];
        } else {
          return [e.dataTransfer.files[0].name];
        }
      });
    }
    return false;
  };

  // triggers when file is selected with click
  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles((prevFiles) => [...prevFiles, e.target.files[0]]);
      setFilesNames((prevName) => {
        if (prevName) {
          return [...prevName, e.target.files[0].name];
        } else {
          return [e.target.files[0].name];
        }
      });
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onDeleteFile = (name: string, index: number) => {
    setFiles(files.filter((file, i) => i !== index));
    if (filesNames) setFilesNames(filesNames.filter((item, j) => j !== index));
    if (filesNames)
      setDeletedFilesNames((prev) =>
        prev
          ? [...prev, ...certificateUrl.filter((item, j) => j === index)]
          : [...certificateUrl.filter((item, j) => j === index)]
      );
  };

  return (
    <>
      <Box className={styles.formFilesUpload}>
        <form
          id="formFilesUpload"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            id="inputFilesUpload"
            accept="image/*"
            className={styles.inputFileUpload}
            multiple={true}
            onChange={(e) => {
              if (handleChange) handleChange(e);
            }}
          />
          <label
            id="labelFilesUpload"
            htmlFor="inputFilesUpload"
            className={
              dragActive ? `${styles.labelFileUpload} ${styles.dragActive}` : ''
            }
          >
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
          </label>
          {dragActive && (
            <div
              id="dragFilesElement"
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
      {filesNames && filesNames.length > 0 && (
        <Box className={styles.formFiles}>
          {filesNames.map((name, index) => {
            return (
              <Box key={index}>
                {name.length > 0 && (
                  <Box
                    sx={{ position: 'relative', mb: '5px' }}
                    onClick={() => {}}
                  >
                    <Close
                      sx={{
                        fontSize: '12px',
                        position: 'absolute',
                        right: '-16px',
                        top: '-1.5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => onDeleteFile(name, index)}
                    />

                    <Box>{name}</Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default DragDropFiles;
