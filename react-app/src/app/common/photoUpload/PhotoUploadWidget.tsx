import React, { Fragment, useState } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { Image } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import { convertDataUrlToBlob } from '../util/imageUtils';

interface IProps {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget: React.FC<IProps> = ({ loading, uploadPhoto }) => {

    //const [files, setFiles] = useState<any[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    // useEffect(() => {
    //     return () => {
    //         files.forEach(file => URL.revokeObjectURL(file.preview));
    //     };
    // });
    
    const uploadImage = () => {
        // Convert the data URL to a blob
        const blob = convertDataUrlToBlob(croppedImage!);
        const file = new File([blob], 'filename', {type: 'image/jpeg'});

        uploadPhoto(file);
    }

    const clearImage = () => {
        setImage(null);
        setCroppedImage(null);
    }

    return (
        <Fragment>
            <Grid>
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <PhotoWidgetDropzone setImage={setImage}
                        setCroppedImage={setCroppedImage} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {image && (
                        <PhotoWidgetCropper image={image}
                            setCroppedImage={setCroppedImage} />
                    )}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal'
                        content='Step 3 - Preview & Upload' />
                    {croppedImage && (
                        <Fragment>
                            <Image src={croppedImage} />
                            <Button.Group widths={2}>
                                <Button positive icon='check'
                                    loading={loading}
                                    onClick={uploadImage} />
                                <Button icon='close'
                                    disabled={loading}
                                    onClick={clearImage} />
                            </Button.Group>
                        </Fragment>
                    )}
                </Grid.Column>
            </Grid>
            

        </Fragment>
    );
}

export default observer(PhotoUploadWidget);
