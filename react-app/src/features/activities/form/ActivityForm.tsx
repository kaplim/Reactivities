import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { ActivityFormValues } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';
//import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators,
    hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message:
            'Description of at least 5 characters is needed'}))(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface DetailParams {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match, history
}) => {
    // const activityStore = useContext(ActivityStore);
    // const {
    //     createActivity,
    //     editActivity,
    //     submitting,
    //     loadActivity
    // } = activityStore;
    const rootStore = useContext(RootStoreContext);
    const {
        createActivity,
        editActivity,
        submitting,
        loadActivity
    } = rootStore.activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id)
                .then((activity) =>
                    setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [loadActivity, match.params.id]);

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;
        
        if (!activity.id) {
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

    return (
        <Grid>
            <Grid.Column width={10}>
            <Segment clearing>
                <FinalForm onSubmit={handleFinalFormSubmit}
                    validate={validate}
                    initialValues={activity}
                    render={({handleSubmit, invalid, pristine}) => (
                        <Form onSubmit={handleSubmit} loading={loading}>
                            <Field placeholder='Title'
                                value={activity.title}
                                name='title'
                                component={TextInput} />
                            <Field placeholder='Description'
                                value={activity.description}
                                name='description'
                                rows={3}
                                component={TextAreaInput} />
                            <Form.Group widths='equal'>
                                <Field placeholder='Date'
                                    component={DateInput} 
                                    value={activity.date}
                                    date={true}
                                    name='date'/>
                                <Field placeholder='Time'
                                    component={DateInput} 
                                    value={activity.date}
                                    time={true}
                                    name='time'/>
                            </Form.Group> 
                            <Field placeholder='Category'
                                value={activity.category}
                                name='category'
                                options={category}
                                component={SelectInput} />
                            <Field placeholder='City'
                                value={activity.city}
                                name='city'
                                component={TextInput} />
                            <Field placeholder='Venue'
                                value={activity.venue}
                                name='venue'
                                component={TextInput} />

                            <Button floated='right' positive
                                type='submit' content='Submit'
                                loading={submitting}
                                disabled={loading || invalid || pristine}
                            />
                            <Button floated='right' type='button'
                                content='Cancel'
                                onClick={activity.id ?
                                    () => history.push(
                                        `/activities/${activity.id}`) : 
                                    () => history.push('/activities')}
                                disabled={loading}
                            />
                        </Form>
                    )}
                />
            </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm);
