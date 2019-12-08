import React, {
  Fragment
} from 'react';
import {
  Badge
} from 'reactstrap';
import moment from 'moment';
import classnames from 'classnames';
import Icon from '../Utilities/Icon';
import { Svgs } from '../../theme';

const DueAt = (props) => {
  const {
    date: dateString, escalated, onhold
  } = props;
  const classNameMap = {
    'text-danger': escalated
  };

  if (onhold) {
    return (
      <Fragment>
        <Badge color="secondary">On hold</Badge>
      </Fragment>
    );
  }

  if (dateString === null) {
    return (
      <span className={classnames(classNameMap)}>
        { escalated === 1 && <Icon source={Svgs.iconArrowUp} size="xs" /> }
        Not Set
      </span>
    );
  }

  const date = moment(moment(dateString).format('YYYY-MM-DD'), 'YYYY-MM-DD');
  // const today = moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD');
  // const diffInDays = date.diff(today, 'days');

  // if (diffInDays < 0) {
  //   return (
  //     <Fragment>
  //       { escalated === 1 && <Icon source={Svgs.iconArrowUp} size="sm" className="text-danger" /> }
  //       <Badge color="danger">Overdue</Badge>
  //     </Fragment>
  //   );
  // }
  // if (diffInDays === 0) {
  //   return (
  //     <Fragment>
  //       { escalated === 1 && <Icon source={Svgs.iconArrowUp} size="sm" className="text-danger" /> }
  //       <Badge color="pink">Due today</Badge>
  //     </Fragment>
  //   );
  // }

  // if (diffInDays === 1) {
  //   return (
  //     <Fragment>
  //       { escalated === 1 && <Icon source={Svgs.iconArrowUp} size="sm" className="text-danger" /> }
  //       <Badge color="primary">Due tomorrow</Badge>
  //     </Fragment>
  //   );
  // }

  // if (diffInDays === 2) {
  //   return (
  //     <Fragment>
  //       { escalated === 1 && <Icon source={Svgs.iconArrowUp} size="sm" className="text-danger" /> }
  //       <Badge color="purple">Due 2 days</Badge>
  //     </Fragment>
  //   );
  // }

  return (
    <span className={classnames(classNameMap)}>
      { escalated === 1 && <Icon source={Svgs.iconArrowUp} size="sm" /> }
      {date.format('D MMM')}
    </span>
  );
};

DueAt.defaultProps = {
  date: null
};

export default DueAt;
