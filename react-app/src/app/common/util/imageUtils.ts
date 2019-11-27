import { Crop } from 'react-image-crop';

export const getCroppedImg = (image: CanvasImageSource, pixelCrop: Crop,
    width: number, height: number) => { //, fileName: string) => {

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d')!;

    if (pixelCrop.x !== undefined && pixelCrop.y !== undefined &&
        pixelCrop.width !== undefined && pixelCrop.height !== undefined) {
        // pixelCrop values in percent (5%=5/100=0.05)
        ctx.drawImage(
            image,
            pixelCrop.x*width/100,
            pixelCrop.y*height/100,
            pixelCrop.width*width/100,
            pixelCrop.height*height/100,
            0,
            0,
            200,
            200
        );
    }

    // As Base64 string
    const base64Image = canvas.toDataURL('image/jpeg');
    return base64Image;

    // As a blob
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob((blob: any) => {
        
    //     blob.name = fileName;
    //     resolve(blob);
    //   }, 'image/jpeg');
    // });

    // return new Promise((resolve, reject) => {
    //     canvas.toBlob((blob: any) => { 
    //         var newImg = document.createElement("img"), 
    //         url = URL.createObjectURL(blob); 
    //         newImg.onload = () => { 
    //             // no longer need to read the blob so it's revoked 
    //             URL.revokeObjectURL(url); 
    //         }; 
    //         newImg.src = url;
    //         resolve(blob);
    //     }, 'image/jpeg');
    // });
}

// Convert the data URL to a blob
export const convertDataUrlToBlob = (dataUrl: string) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], {type: mime});

    // Use the blob to create an object URL:
    //const objectURL = URL.createObjectURL(blob);
    
    // Use the object URL as the image src:
    //document.getElementById('myImage').src = objectURL;

    // Convert the Blob into a File
    //const file = new File([blob], 'filename', {type: 'image/jpeg'});
}
