import React from 'react';

import ActivityItem from './ActivityItem';

const Activities = (props) => {
  const {
    activities
  } = props;
  return (
    activities && activities.length > 0 && (
      <div className="activities">
        {
          activities.map((activity, index) => (
            <ActivityItem data={activity} key={`${index}`} />
          ))
        }
      </div>
    )
  );
};

Activities.defaultProps = {
  activities: []
};

export default Activities;
