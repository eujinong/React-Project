import moment from 'moment';
import {
  USER_ROLE, TASK_STATUS, TASK_PHASE, ATTACHMENT_TYPE, FILE_TYPE, NOTIFICATION_TYPE
} from '../configs/enums';
import { TaskPhaseOptions } from '../helpers/OptionsHelper';

class Data {
  constructor() {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);

    this.afterTomorrow = new Date();
    this.afterTomorrow.setDate(this.afterTomorrow.getDate() + 2);

    this.furtherDate = new Date();
    this.furtherDate.setDate(this.furtherDate.getDate() + 10);

    this.sampleDates = [
      this.yesterday.toISOString(), this.today.toISOString(), this.tomorrow.toISOString(), this.afterTomorrow.toISOString(), this.furtherDate.toISOString(), null
    ];

    this.sampleUsers = [
      {
        id: 1,
        name: 'Manager Tim',
        company: 'Timmicom',
        email: 'manager@timmicom.net',
        password: 'manager',
        title: 'Designer',
        role: USER_ROLE.MANAGER
      },
      {
        id: 2,
        name: 'Tim Milfull',
        company: 'Timmicom',
        email: 'worker@timmicom.net',
        password: 'worker',
        title: 'Engineer',
        role: USER_ROLE.HR
      },
      {
        id: 3,
        name: 'Andrew Welstead',
        company: 'Flip',
        email: 'welly@timmicom.net',
        password: 'worker',
        title: 'Master Engineer',
        role: USER_ROLE.HR
      },
      {
        id: 4,
        name: 'Jonas Anker',
        company: 'Flip',
        email: 'jonas@timmicom.net',
        password: 'worker',
        title: 'Designer',
        role: USER_ROLE.HR
      },
      {
        id: 5,
        name: 'Nick Bart',
        company: 'Flip',
        email: 'nick@timmicom.net',
        password: 'worker',
        title: 'Engineer',
        role: USER_ROLE.HR
      },
      {
        id: 6,
        name: 'Keith McGahey',
        company: 'Flip',
        email: 'keith@timmicom.net',
        password: 'worker',
        title: 'Designer',
        role: USER_ROLE.HR
      }
    ];

    this.sampleClients = this.sampleUsers;

    this.sampleTaskStatuses = [
      TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.PENDING_VERIFICATION, TASK_STATUS.VERIFIED, TASK_STATUS.COMPLETED
    ];

    this.sampleTaskPhases = [
      TASK_PHASE.PRE_APPRAISAL, TASK_PHASE.APPRAISAL, TASK_PHASE.DESIGN_TEMPLATE, TASK_PHASE.DESIGN_RELEASE
    ];

    this.sampleTaskTitles = [
      'CTOW',
      'CAN Appraisal',
      'TECH Appraisal',
      'Categorisation',
      'Design template',
      'CD/Release'
    ];

    this.sampleOrderTitles = [
      "McDonald's - Canberra",
      'Parramatta Railway Station (VHA)',
      'Telstra Air Partner Sites - The Gold Coast University Hospital – NICU Family Room',
      'Telstra Exchange - GLEB - (NBN CO LIMITED)'
    ];

    this.sampleFileTypes = [
      'image', 'word', 'pdf'
    ];

    this.sampleAttachments = [
      {
        title: 'CAN Appraisal',
        attached_at: this.today.toISOString(),
        attachment_type: ATTACHMENT_TYPE.FILE,
        file_type: 'word',
        link: 'https://www.weareflip.com',
        user: this.getRandomUser()
      },
      {
        title: 'Site photo',
        attached_at: this.today.toISOString(),
        attachment_type: ATTACHMENT_TYPE.FILE,
        file_type: 'image',
        link: 'https://www.weareflip.com',
        user: this.getRandomUser()
      },
      {
        title: 'Pre-appraisal summary',
        attached_at: this.today.toISOString(),
        attachment_type: ATTACHMENT_TYPE.FILE,
        file_type: 'pdf',
        link: 'https://www.weareflip.com',
        user: this.getRandomUser()
      },
      {
        title: 'Pre-appraisal summary',
        attached_at: this.today.toISOString(),
        attachment_type: ATTACHMENT_TYPE.URL,
        file_type: FILE_TYPE.URL,
        link: 'https://www.weareflip.com',
        user: this.getRandomUser()
      }
    ];
    this.autoIncrement = 1;

    this.tasksList = null;
    this.orderItemsList = null;
  }

  getRandomDate() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleDates.length;
    return this.sampleDates[index];
  }

  getRandomUser() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleUsers.length;
    return this.sampleUsers[index];
  }

  getRandomClient() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleClients.length;
    return this.sampleClients[index];
  }

  getRandomUsers() {
    const count = (parseInt(Math.random() * 100, 0) % this.sampleUsers.length) + 1;
    const users = [...this.sampleUsers];
    const retUsers = [];
    for (let i = 0; i < count; i++) {
      const index = parseInt(Math.random() * 100, 0) % this.sampleUsers.length;
      retUsers[i] = users[i];
      users.slice(index, 1);
    }
    return retUsers;
  }

  getRandomTaskTitle() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleTaskTitles.length;
    return this.sampleTaskTitles[index];
  }

  getRandomOrderTitle() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleOrderTitles.length;
    return this.sampleOrderTitles[index];
  }

  getRandomTaskStatus() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleTaskStatuses.length;
    return this.sampleTaskStatuses[index];
  }

  getRandomTaskPhase() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleTaskPhases.length;
    return this.sampleTaskPhases[index];
  }

  getRandomFileType() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleFileTypes.length;
    return this.sampleFileTypes[index];
  }

  getRandomAttachment() {
    const index = parseInt(Math.random() * 100, 0) % this.sampleAttachments.length;
    return this.sampleAttachments[index];
  }

  getRandomTask() {
    const task = {
      id: this.autoIncrement,
      title: this.getRandomTaskTitle(),
      content: 'This is a paragraph about a project task that some members will be able to see and access. It contains only text and hyperlinks. Few would argue that, despite the advancements of feminism over the past three decades, women still face a double standard when it comes to their behavior. While men’s borderline-inappropriate behavior is often laughed off as “boys will be boys,” women face higher.',
      assignees: [this.getRandomUser()],
      verifiers: [this.getRandomUser()],
      notes: [
        {
          noted_at: '2018-11-04',
          content: 'Thanks Duncan!',
          noter: this.getRandomUser()
        },
        {
          noted_at: '2018-11-04',
          content: '<p>Hi <b style="background-color: #EBEDF0;border-radius: 2;">Claire L</b> <b>SAT</b> has been completed, files in TCSS 😊</p><p>Please complete Draft MMDT and CRAMER build for this design - Design Task TD1601 + TD1602.</p>',
          noter: this.getRandomUser()
        }
      ],
      activities: [
        {
          acted_at: '2018-11-04',
          content: '<b>Duncan G</b> approved the appraisal'
        },
        {
          acted_at: '2018-11-04',
          content: '<b>Josep S G</b> changed status to <b class="text-success">Completed</b>'
        },
        {
          acted_at: '2018-11-04',
          content: '<b>Josep S G</b> changed status to <b class="text-warning">Completed</b>'
        }
      ],
      comments: [
        {
          commented_at: '2018-11-04',
          content: 'Thanks Duncan!',
          commenter: this.getRandomUser()
        },
        {
          commented_at: '2018-11-04',
          content: '<p>Hi <b style="background-color: #EBEDF0;border-radius: 2;">Claire L</b> <b>SAT</b> has been completed, files in TCSS 😊</p><p>Please complete Draft MMDT and CRAMER build for this design - Design Task TD1601 + TD1602.</p>',
          commenter: this.getRandomUser()
        }
      ],
      fibre: 'Haul',
      attachments: [
        this.getRandomAttachment()
      ],
      links: [
        {
          title: 'Pre-appraisal summary',
          attached_at: this.today.toISOString(),
          link: 'https://www.weareflip.com',
          user: this.getRandomUser()
        }
      ],
      communications: [
        {
          communicated_at: this.yesterday.toISOString(),
          title: 'Task CAN Appraisal COMPLETED',
          content: 'Josep Sagewise has generated new order'
        },
        {
          communicated_at: this.today.toISOString(),
          title: 'Order generated',
          content: 'Josep Sagewise has generated new order'
        },
        {
          communicated_at: this.tomorrow.toISOString(),
          title: 'Order generated',
          content: 'Josep Sagewise has generated new order'
        },
        {
          communicated_at: this.afterTomorrow.toISOString(),
          title: 'Order generated',
          content: 'Josep Sagewise has generated new order'
        },
        {
          communicated_at: this.furtherDate.toISOString(),
          title: 'Order generated',
          content: 'Josep Sagewise has generated new order'
        }
      ],
      status_changed_at: '2018-11-04',
      status_changer: this.getRandomUser(),
      status: this.getRandomTaskStatus(),
      phase: this.getRandomTaskPhase(),
      due_at: this.getRandomDate()
    };
    this.autoIncrement++;
    return task;
  }

  getRandomOrderOnly() {
    const order = {
      id: this.autoIncrement,
      title: this.getRandomOrderTitle(),
      customer: 'Department of Innovation',
      fnn: 'N76186558R',
      service_type: 'QF',
      number: '130078866W2253',
      service_of_type: 'RRR/RRP',
      notes: [
        {
          content: 'This is a short two line note about a project that all team members will be able to see and access. It contains only text and hyperlinks.',
          noted_at: this.today.toISOString(),
          noter: this.getRandomUser()
        },
        {
          content: 'This is a long note about a project the project that all team members will be able to see and access. Users wil be able to see three lines of text before they will need to interact in or close',
          noted_at: this.today.toISOString(),
          noter: this.getRandomUser()
        }
      ],
      assignees: this.getRandomUsers(),
      verifiers: this.getRandomUsers(),
      created_at: this.today.toISOString()
    };
    this.autoIncrement++;
    return order;
  }

  getRandomOrder() {
    const order = this.getRandomOrderOnly();
    const tasks = [];
    const tasksCount = 3 + parseInt((Math.random() * 5), 0);
    for (let i = 0; i < tasksCount; i++) {
      const task = this.getRandomTask();
      task.order = order;
      tasks.push(task);
    }
    order.tasks = tasks;
    order.phases = [];

    for (let k = 0, nk = TaskPhaseOptions.length; k < nk; k++) {
      const phaseOption = TaskPhaseOptions[k];
      const phase = {
        ...phaseOption,
        order,
        tasks: [],
        due_at: this.getRandomDate()
      };
      for (let j = 0, nj = order.tasks.length; j < nj; j++) {
        const task = order.tasks[j];
        if (task.group === phaseOption.value) {
          task.order_phase = phase;
          phase.tasks.push(task);
        }
      }
      if (phase.tasks.length > 0) {
        order.phases.push(phase);
      }
    }
    return order;
  }

  getRandomOrders() {
    const ordersCount = 2;
    const orders = [];
    for (let i = 0; i < ordersCount; i++) {
      const order = this.getRandomOrder();
      orders.push(order);
    }
    return orders;
  }

  getOrdersList() {
    if (this.ordersList) {
      return this.ordersList;
    }
    const orders = this.getRandomOrders();
    this.ordersList = orders;
    return this.ordersList;
  }

  getTasksList() {
    if (this.tasksList) {
      return this.tasksList;
    }

    const orders = this.getOrdersList();
    const tasksList = [];
    for (let i = 0, ni = orders.length; i < ni; i++) {
      const order = orders[i];
      for (let j = 0, nj = order.tasks.length; j < nj; j++) {
        const task = order.tasks[j];
        tasksList.push(task);
      }
    }
    this.tasksList = tasksList;
    return tasksList;
  }

  getNotificationsList() {
    return (
      [
        {
          title: 'Ready for review',
          body: '<b>CAN</b> appraisal is ready for review and verification for Order <b>12343132</b>',
          data: {
            notified_at: moment().format('YYYY-MM-DD'),
            notification_type: NOTIFICATION_TYPE.ACTIONABLE,
            actions: [
              {
                title: 'Review now',
                to: '/'
              }
            ]
          }
        },
        {
          title: 'Order processed',
          body: 'Order 12343132 has moved to the Appraisal phase',
          data: {
            notified_at: moment().format('YYYY-MM-DD'),
            notification_type: NOTIFICATION_TYPE.READONLY
          }
        },
        {
          title: 'Ready for review',
          body: 'You have 8 tasks already for review and verification',
          data: {
            notified_at: moment().subtract(1, 'day').format('YYYY-MM-DD'),
            notification_type: NOTIFICATION_TYPE.ACTIONABLE,
            actions: [
              {
                title: 'See all',
                to: '/'
              }
            ]
          }
        },
        {
          title: 'Order processed',
          body: 'You have 4 orders that have progressed',
          data: {
            notified_at: moment().subtract(1, 'day').format('YYYY-MM-DD'),
            notification_type: '',
            actions: [
              {
                title: 'See all',
                to: '/'
              }
            ]
          }
        },
        {
          title: 'Ready for review',
          body: 'CAN appraisal is ready for review and verification for Order 12343132',
          data: {
            notified_at: moment().subtract(2, 'day').format('YYYY-MM-DD'),
            notification_type: NOTIFICATION_TYPE.READONLY,
            actions: [
              {
                title: 'Review now',
                to: '/'
              }
            ]
          }
        },
        {
          title: 'Order processed',
          body: 'Order 12343132 has moved to the Appraisal phase',
          data: {
            notified_at: moment().subtract(2, 'day').format('YYYY-MM-DD'),
            notification_type: NOTIFICATION_TYPE.ACTIONABLE
          }
        },
        {
          title: 'Task processed',
          body: 'Appraisal been updated to In progress by Joseph Sagewise',
          data: {
            notified_at: moment().subtract(2, 'day').format('YYYY-MM-DD'),
            notification_type: NOTIFICATION_TYPE.ACTIONABLE
          }
        }
      ]
    );
  }

  getAssigneesImportData() {
    return [
      {
        id: 1,
        title: this.getRandomOrderTitle(),
        customer: 'Department of Innovation',
        fnn: 'N76186558R',
        service_type: 'QF',
        number: '130078866W2253',
        service_of_type: 'RRR/RRP',
        assignees: this.getRandomUsers(),
        verifiers: this.getRandomUsers(),
        tasks: [
          {
            id: 1,
            title: 'CTOW',
            assignees: [],
            verifiers: []
          },
          {
            id: 2,
            title: 'CAN Appraisal',
            assignees: [],
            verifiers: []
          },
          {
            id: 3,
            title: 'TECH Appraisal',
            assignees: [],
            verifiers: []
          }, {
            id: 4,
            title: 'Categorisation',
            assignees: [],
            verifiers: []
          },
          {
            id: 5,
            title: 'Design tmplate',
            assignees: [],
            verifiers: []
          },
          {
            id: 6,
            title: 'CD/Release',
            assignees: [],
            verifiers: []
          }
        ]
      },
      {
        id: 2,
        title: this.getRandomOrderTitle(),
        customer: 'Department of Innovation',
        fnn: 'N76186558R',
        service_type: 'QF',
        number: '130078866W2253',
        service_of_type: 'RRR/RRP',
        assignees: this.getRandomUsers(),
        verifiers: this.getRandomUsers(),
        tasks: [
          {
            id: 1,
            title: 'CTOW',
            assignees: [],
            verifiers: []
          },
          {
            id: 2,
            title: 'CAN Appraisal',
            assignees: [],
            verifiers: []
          },
          {
            id: 3,
            title: 'TECH Appraisal',
            assignees: [],
            verifiers: []
          }, {
            id: 4,
            title: 'Categorisation',
            assignees: [],
            verifiers: []
          },
          {
            id: 5,
            title: 'Design tmplate',
            assignees: [],
            verifiers: []
          },
          {
            id: 6,
            title: 'CD/Release',
            assignees: [],
            verifiers: []
          }
        ]
      }
    ];
  }

  getDownloadCompletedHeader() {
    return (
      [
        { key: 'client', label: 'Client' },
        { key: 'order_number', label: 'Order Number' },
        { key: 'workflow', label: 'Workflow' },
        { key: 'fnn', label: 'Service (FNN)' },
        { key: 'service_type', label: 'Service Type' },
        { key: 'service_of_type', label: 'Service of Type' },
        { key: 'phase', label: 'Phase' },
        { key: 'order_on_hold', label: 'Order On Hold' },
        { key: 'priority', label: 'Priority' },
        { key: 'created_at', label: 'Created at' },
        { key: 'due_date', label: 'Due date' },
        { key: 'completed', label: 'Completed' }
      ]
    );
  }

  getDownloadActiveHeader() {
    return (
      [
        { key: 'client', label: 'Client' },
        { key: 'order_number', label: 'Order Number' },
        { key: 'workflow', label: 'Workflow' },
        { key: 'fnn', label: 'Service (FNN)' },
        { key: 'service_type', label: 'Service Type' },
        { key: 'service_of_type', label: 'Service of Type' },
        { key: 'phase', label: 'Phase' },
        { key: 'order_on_hold', label: 'Order On Hold' },
        { key: 'priority', label: 'Priority' },
        { key: 'created_at', label: 'Created at' },
        { key: 'due_date', label: 'Due date' },
        { key: 'task_name', label: 'Task Name' },
        { key: 'status', label: 'Status' },
        { key: 'assignee', label: 'Assignee (User ID)' },
        { key: 'task_due_date', label: 'Task Due Date' },
        { key: 'verified', label: 'Verified' },
        { key: 'verifier', label: 'Verifier (User ID)' }
      ]
    );
  }

  getOrderGroups() {
    return (
      [
        { label: 'Appraisal', value: 'appraisal' },
        { label: 'Design', value: 'design' }
      ]
    );
  }
}

const data = new Data();
export default data;
