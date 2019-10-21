import React, { useContext } from 'react'
import { Segment, Item, Label, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/stores/activityStore';
import { Link } from 'react-router-dom';

const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate: activities,
        deleteActivity, submitting, target} = activityStore;
    
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='Delete'
                                    color='brown'
                                    onClick={(event) =>
                                        deleteActivity(event, activity.id)}
                                    loading={
                                        target === activity.id && submitting}
                                    name={activity.id}
                                />
                                <Button floated='right' content='View'
                                    color='blue'
                                    as={Link} to={`/activities/${activity.id}`}
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList);
//onClick={() => selectActivity(activity.id)}