import React from 'react';
import moment from 'moment';

const ActivityItem = (props) => {
  const {
    data
  } = props;
  return (
    <div className="activity-item">
      <div className="when">
        {moment(data.acted_at).format('D MMM YYYY')}
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

ActivityItem.defaultProps = {
  activities: []
};

export default ActivityItem;
