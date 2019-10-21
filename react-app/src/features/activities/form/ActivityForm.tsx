import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match, history
}) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        activity: initFormState,
        loadActivity,
        clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(() =>
                initFormState && setActivity(initFormState));
        }
        return () => clearActivity();
    }, [loadActivity, clearActivity, match.params.id, initFormState,
        activity.id.length]);

    const handleSubmit = () => {
        //console.log(activity);
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() =>
                history.push(`/activities/${newActivity.id}`));
        }
        else {
            editActivity(activity).then(() =>
                history.push(`/activities/${activity.id}`));
        }
    }

    const handleInputChange =
        (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value});
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title'
                    value={activity.title}
                    name='title'
                    onChange={handleInputChange} />
                <Form.TextArea rows={2} placeholder='Description'
                    value={activity.description}
                    name='description'
                    onChange={handleInputChange} />
                <Form.Input placeholder='Category'
                    value={activity.category}
                    name='category'
                    onChange={handleInputChange} />
                <Form.Input placeholder='Date'
                    value={activity.date}
                    type='datetime-local'
                    name='date'
                    onChange={handleInputChange} />
                <Form.Input placeholder='City'
                    value={activity.city}
                    name='city'
                    onChange={handleInputChange} />
                <Form.Input placeholder='Venue'
                    value={activity.venue}
                    name='venue'
                    onChange={handleInputChange} />

                <Button floated='right' positive
                    type='submit' content='Submit'
                    loading={submitting}
                />
                <Button floated='right' type='button' content='Cancel'
                    onClick={() => history.push('/activities')}
                />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
