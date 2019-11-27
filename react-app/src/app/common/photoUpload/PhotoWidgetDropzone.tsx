import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react';

interface IProps {
    //setFiles: (files: object[]) => void;
    setImage: (image: string) => void;
    setCroppedImage: (croppedImage: string) => void;
}

const dropzoneStyles = {
    border: 'dashed 3px',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: '200px'
};

const dropzoneActive = {
    borderColor: 'green'
};

const PhotoWidgetDropzone: React.FC<IProps> = ({ setImage, setCroppedImage }) => {

    const onDrop = useCallback(acceptedFiles => {
        //console.log(acceptedFiles);
        // setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
        //     preview: URL.createObjectURL(file)
        // })));

        // acceptedFiles.map((file: object) => {
        //     setCroppedImage(URL.createObjectURL(file));
        // });

        if (acceptedFiles && acceptedFiles.length > 0) {
            const currentFile = acceptedFiles[0]
            //setCroppedImage(URL.createObjectURL(currentFile));

            // Check for file type and size
            
            const reader = new FileReader();
            reader.addEventListener('load', (event: any) => {
                setImage(event.target.result);
                setCroppedImage(event.target.result);
            }, false);
            reader.readAsDataURL(currentFile);
        }
    }, [setImage, setCroppedImage]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} style={
            isDragActive ? { ...dropzoneStyles, ...dropzoneActive } :
            dropzoneStyles } >
                
            <input {...getInputProps()} />
            <Icon name='upload' size='huge' />
            <Header content='Drop image here' />
        </div>
    )
}

export default PhotoWidgetDropzone