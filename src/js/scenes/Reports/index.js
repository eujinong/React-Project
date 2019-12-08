/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  connect
} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Form, Label, Button
} from 'reactstrap';
import Lottie from 'react-lottie';
import moment from 'moment';
import Select from 'react-select';
import { Formik } from 'formik';
import Api from '../../apis/app';
import DateRangePicker from '../../components/DateRangePicker';
import Icon from '../../components/Utilities/Icon';
import { Svgs } from '../../theme';
import * as animationData from './animationData.json';

import {
  setReport
} from '../../actions/common';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workflows: [],
      downloading: false,
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
      completedWorkflow: null,
      activeWorkflow: null
    };
    this.formikRef = React.createRef();
    this.dateRef = React.createRef();
    this.handleChangeDateRange = this.handleChangeDateRange.bind(this);
  }

  async componentDidMount() {
    this.componentWillReceiveProps(this.props);
    const res = await Api.get('v1/workflows/assignment');
    const {
      response, body
    } = res;

    switch (response.status) {
      case 200:
        this.setState({
          workflows: body.data
        });
        break;
      default:
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { report } = nextProps;
    if (report) {
      if (!this.isReportGenerated(report)) {
        this.setState({
          downloading: true
        });
      } else {
        setTimeout(() => {
          this.downloadReport(report);
        }, 3000);
      }
    }
  }

  isReportGenerated(report) {
    return report.status === 'generated';
  }

  async handleChangeDateRange(values) {
    this.setState({
      startDate: values.start_date,
      endDate: values.end_date
    });
  }

  handleWorkflow(type, value) {
    if (type === 'completed_orders') {
      this.setState({
        completedWorkflow: value
      });
    }
    if (type === 'active_orders') {
      this.setState({
        activeWorkflow: value
      });
    }
  }

  downloadViaUrl(url, report) {
    // download report
    const link = document.createElement('a');
    link.href = url;
    link.download = report.filename || 'report.csv';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      // clean up report info
      this.props.setReport(null);
      this.setState({
        downloading: false
      });
    }, 100);
  }

  async downloadReport(report) {
    const { user } = this.props;

    // do not download report automatically if it was requested by a different user
    if (user && user.id !== report.requested_by) {
      return;
    }

    const res = await Api.get(`v1/reports/${report.id}/download`);
    const {
      response, body
    } = res;
    switch (response.status) {
      case 200:
        setTimeout(() => {
          const blob = new Blob([body], { type: 'text/csv;charset=utf-8;' });
          const url = window.URL.createObjectURL(blob);
          this.downloadViaUrl(url, report);
        }, 3000);
        break;
      default:
        break;
    }
  }

  async handleDownload(type) {
    const {
      startDate,
      endDate,
      completedWorkflow,
      activeWorkflow
    } = this.state;
    this.setState({
      downloading: true
    });
    if (type === 'completed_orders') {
      const startDateQuery = startDate ? `&start_date=${moment(startDate).format('YYYY-MM-DD')}` : `&start_date=${moment(moment().startOf('month')).format('YYYY-MM-DD')}`;
      const endDateQuery = endDate ? `&end_date=${moment(endDate).format('YYYY-MM-DD')}` : `&end_date=${moment(moment().endOf('month')).format('YYYY-MM-DD')}`;
      const res = await Api.post(`v1/reports/create?type=${type}&workflow_id=${completedWorkflow ? completedWorkflow.id : ''}${startDateQuery}${endDateQuery}`);
      const {
        response, body
      } = res;
      switch (response.status) {
        case 200:
          if (body.success && this.isReportGenerated(body.report)) {
            this.downloadReport(body.report);
          }
          break;
        default:
          break;
      }
    }
    if (type === 'active_orders') {
      const res = await Api.post(`v1/reports/create?type=${type}&workflow_id=${activeWorkflow ? activeWorkflow.id : ''}`);
      const {
        response, body
      } = res;
      switch (response.status) {
        case 200:
          if (body.success && this.isReportGenerated(body.report)) {
            this.downloadReport(body.report);
          }
          break;
        default:
          break;
      }
    }
  }

  handleReset(type) {
    if (type === 'completed_orders') {
      this.dateRef.current.handleCancel(type, { startDate: moment().startOf('month'), endDate: moment().endOf('month') });
      this.setState({
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
        completedWorkflow: null
      });
    }
    if (type === 'active_orders') {
      this.setState({
        activeWorkflow: null
      });
    }
  }

  render() {
    const {
      workflows,
      downloading,
      activeWorkflow,
      completedWorkflow,
      startDate,
      endDate
    } = this.state;

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const { report } = this.props;
    let reportProgress;
    let reportGenerated = null;
    if (report) {
      reportProgress = report.progress;
      reportGenerated = this.isReportGenerated(report);
    }

    return (
      <div className="reports-page">
        <div className="actionbar">
          <Container fluid>
            <h3>Reports</h3>
          </Container>
        </div>
        <Container>
          <div className="report-panel">
            <div className="panel-header">
              <h5>Completed orders</h5>
            </div>
            <div className="actions">
              <Formik
                ref={this.formikRef}
                onSubmit={this.handleChangeDateRange}
                render={({
                  setFieldValue,
                  handleSubmit
                }) => (
                  <Form onSubmit={handleSubmit} className="report-form">
                    <div className="form-item">
                      <Label>Select date range to generate</Label>
                      <DateRangePicker
                        ref={this.dateRef}
                        options={{
                          ...(startDate ? { startDate } : {}),
                          ...(endDate ? { endDate } : {}),
                          alwaysShowCalendars: true,
                          ranges: {
                            Today: [moment(), moment()],
                            'This week': [moment().startOf('week'), moment().endOf('week')],
                            'This month': [moment().startOf('month'), moment().endOf('month')],
                            'This year': [moment().startOf('year'), moment().endOf('year')]
                          }
                        }}
                        placeholder="Date range"
                        format="DD/MM/YYYY"
                        onChange={async (value) => {
                          await setFieldValue('start_date', value && value.startDate ? value.startDate : null);
                          await setFieldValue('end_date', value && value.endDate ? value.endDate : null);
                          handleSubmit();
                        }}
                      />
                    </div>
                    <div className="form-item">
                      <Label>Select workflow template to generate</Label>
                      <Select
                        placeholder="All templates"
                        menuPlacement="auto"
                        maxMenuHeight={240}
                        classNamePrefix="react-select"
                        indicatorSeparator={null}
                        options={workflows}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.title}
                        value={completedWorkflow}
                        components={{
                          DropdownIndicator: () => (<Icon source={Svgs.iconCaretDown} />),
                          ClearIndicator: () => null
                        }}
                        onChange={this.handleWorkflow.bind(this, 'completed_orders')}
                      />
                    </div>
                    <div className="form-item d-flex align-items-end">
                      <Button
                        color="primary"
                        type="button"
                        onClick={this.handleReset.bind(this, 'completed_orders')}
                      >
                        Reset
                      </Button>
                    </div>
                  </Form>
                )}
              />
              <Button
                type="button"
                color="silver"
                className="ml-auto"
                onClick={this.handleDownload.bind(this, 'completed_orders')}
              >
                <Icon source={Svgs.iconDownload} />
                Generate report
              </Button>
            </div>
          </div>
          <div className="report-panel">
            <div className="panel-header">
              <h5>Active orders</h5>
            </div>
            <div className="actions">
              <Formik
                render={() => (
                  <Form className="report-form">
                    <div className="form-item">
                      <Label>Select workflow template to generate</Label>
                      <Select
                        placeholder="All templates"
                        menuPlacement="auto"
                        maxMenuHeight={240}
                        classNamePrefix="react-select"
                        indicatorSeparator={null}
                        options={workflows}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.title}
                        value={activeWorkflow}
                        components={{
                          DropdownIndicator: () => (<Icon source={Svgs.iconCaretDown} />),
                          ClearIndicator: () => null
                        }}
                        onChange={this.handleWorkflow.bind(this, 'active_orders')}
                      />
                    </div>
                    <div className="form-item d-flex align-items-end">
                      <Button
                        color="primary"
                        type="button"
                        onClick={this.handleReset.bind(this, 'active_orders')}
                      >
                        Reset
                      </Button>
                    </div>
                  </Form>
                )}
              />
              <Button
                type="button"
                color="silver"
                className="ml-auto"
                onClick={this.handleDownload.bind(this, 'active_orders')}
              >
                <Icon source={Svgs.iconDownload} />
                Generate report
              </Button>
            </div>
          </div>
        </Container>
        {
          downloading && (
            <div className="download-cube">
              <div className="animation">
                <Lottie
                  options={defaultOptions}
                  width={90}
                  height={90}
                />
              </div>
              <div className="cube-content">
                <div className="title">
                  {reportGenerated && <span>Report generated</span>}

                  {(!reportGenerated) && (
                  <span>
                    Generating report
                    {reportProgress && (
                    <span>
                      {' '}
                      ...
                      {' '}
                      {reportProgress}
                      %
                    </span>
                    )}
                  </span>
                  )}
                </div>
                <div className="content">
                  Your report will download automatically when this window closes
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.common.auth ? state.common.auth.profile : null,
  users: state.common.users,
  report: state.common.report
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setReport: bindActionCreators(setReport, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reports));
