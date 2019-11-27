import React, { useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop';
import { getCroppedImg } from '../util/imageUtils';

interface IProps {
    image: string;
    setCroppedImage: (croppedImage: string) => void;
}

const PhotoWidgetCropper: React.FC<IProps> = ({ image, setCroppedImage }) => {

    const [crop, setCrop] = useState<Crop>({
        x:10,
        y:10,
        aspect: 1/1,
        //height: 50,
        width: 50
    });

// not needed with initialization in useState()
    // const onImageLoaded = (image: any) => {
    //     makeAspectCrop({
    //         x:10,
    //         y:10,
    //         aspect: 1/1,
    //         width: 50
    //       }, 50, 50);
    //      return false; // Return false when setting crop state in here.
    // };

    const onImageLoaded = (image: HTMLImageElement) => {
        //console.log('IMAGE:', image);
    }

    const onCropChange = (crop: Crop) => {
        setCrop(crop);
        //console.log(crop);
    };
    
    const onCropCompleted = (crop: Crop, pixelCrop: Crop) => {
        //console.log(crop, pixelCrop);
        const img = new Image();
        img.src = image;
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        const croppedImage: any =
            getCroppedImg(img, pixelCrop, width, height);
        setCroppedImage(croppedImage);
    }

    return (
        <ReactCrop src={ image }
            crop={ crop }
            onImageLoaded={ onImageLoaded }
            onChange={ onCropChange }
            onComplete={ onCropCompleted }
        />
    )
}

export default PhotoWidgetCropper;

