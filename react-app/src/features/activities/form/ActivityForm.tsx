import React, { useState, FormEvent, useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    activity: IActivity | undefined; //null;
}

const ActivityForm: React.FC<IProps> = ({
    activity: initFormState
}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting,
        cancelFormOpen} = activityStore;

    const initForm = () => {
        if (initFormState) {
            return initFormState;
        }
        else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initForm);

    const handleSubmit = () => {
        //console.log(activity);
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }
        else {
            editActivity(activity);
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
                    onClick={cancelFormOpen}
                />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
