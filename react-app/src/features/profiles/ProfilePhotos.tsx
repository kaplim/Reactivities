import React, { useContext, useState } from 'react'
import { Tab, Header, Card, Image, Grid, Button }
    from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';

export const ProfilePhotos = () => {

    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadingPhoto, uploadPhoto,
        setMainPhoto, deletePhoto, loading }  // loading should be last
        = rootStore.profileStore;
    const [target, setTarget] = useState<string | undefined>(undefined);
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
        undefined
    );

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    };

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)} />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handleUploadImage}
                            loading={uploadingPhoto} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile && profile.photos.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser &&
                                        <Button.Group fluid widths={2}>
                                            <Button basic positive
                                                name={photo.id}
                                                onClick={(e) => {
                                                    setMainPhoto(photo);
                                                    setTarget(e.currentTarget.name);
                                                }}
                                                loading={loading &&
                                                    target === photo.id}
                                                disabled={photo.isMain}
                                                content='Main' />
                                            <Button
                                                name={photo.id}
                                                disabled={photo.isMain}
                                                onClick={(e) => {
                                                    deletePhoto(photo);
                                                    setDeleteTarget(e.currentTarget.name)
                                                }}
                                                loading={loading &&
                                                    deleteTarget === photo.id}
                                                basic
                                                negative
                                                icon='trash'
                                            />
                                        </Button.Group>
                                    }
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)
