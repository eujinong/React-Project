export const KANBAN_STATUS = {
  ONHOLD: 'on-hold',
  TODO: 'to-do',
  IN_PROGRESS: 'in-progress',
  PENDING_VERIFICATION: 'pending-verification'
};

export const TASK_STATUS = {
  ONHOLD: 'on-hold',
  TODO: 'to-do', // To do
  IN_PROGRESS: 'in-progress', // In progress
  PENDING_VERIFICATION: 'pending-verification', // Completed, Awaiting approval
  VERIFIED: 'verified', // Approved
  COMPLETED: 'completed' // Completed
};

export const ORDER_STATUS = {
  ONHOLD: 'on-hold',
  TODO: 'to-do',
  IN_PROGRESS: 'in-progress',
  PENDING_VERIFICATION: 'pending-verification',
  CLOSED: 'closed'
};

export const TASK_PHASE = {
  ONHOLD: 'on-hold',
  PRE_APPRAISAL: 'pre-appraisal',
  APPRAISAL: 'appraisal',
  DESIGN_TEMPLATE: 'design',
  DESIGN: 'design',
  DESIGN_RELEASE: 'design-release',
  REDESIGN: 'redesign'
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const USER_ROLE = {
  MANAGEMENT: 'management',
  WORKER: 'worker',
  HR: 'hr',
  MANAGER: 'manager',
  GOD: 'god',
  DESIGNER: 'designer',
  ACCOUNTS: 'accounts'
};

export const FILE_TYPE = {
  WORD: 'word',
  PDF: 'pdf',
  IMAGE: 'image',
  URL: 'url'
};

export const ATTACHMENT_TYPE = {
  FILE: 'file',
  URL: 'url'
};

export const FILE_ATTACHING_STATUS = {
  IDLE: 'idle',
  ATTACHING: 'attaching',
  ATTACHING_COMPLETED: 'completed',
  ATTACHING_FAILED: 'failed'
};

export const NOTIFICATION_TYPE = {
  READY_FOR_REVIEW: 'ready-for-review',
  PROCESSED: 'processed',
  READONLY: 'readonly',
  ACTIONABLE: 'actionable'
};

export const TASK_DEFAULT_TITLES = {
  CTOW: 'CTOW',
  CAN_APPRAISAL: 'CAN Appraisal',
  TECH_APPRAISAL: 'Tech Appraisal',
  CATEGORISATION: 'Categorisation',
  DESIGN_TEMPLATE: 'Design Template',
  CD_RElEASE: 'CD/Release'
};

export const Node_code = {
  name: 'node_code',
  label: 'Node code',
  value: null,
  type: 'text',
  validation: 'string|max:5|alpha_num',
  multiple: false,
  attributes: [],
  settings: []
};

export const Node_code_status = {
  name: 'node_code_status',
  label: 'Node code status',
  value: null,
  type: 'radio',
  validation: null,
  multiple: false,
  attributes: [],
  settings: [],
  options: {
    existing: 'Existing',
    created: 'Created'
  },
  default_option: 'existing'
};

export const Psa1_check = {
  attributes: [],
  default_option: 'yes',
  label: 'PSA1 check',
  multiple: false,
  name: 'psa1_check',
  options: {
    yes: 'Yes', no: 'No'
  },
  no: 'No',
  yes: 'Yes',
  settings: [],
  type: 'radio',
  validation: null,
  value: null
};

export const Psa2_check = {
  attributes: [],
  default_option: 'yes',
  label: 'PSA2 check',
  multiple: false,
  name: 'psa1_check',
  options: {
    yes: 'Yes', no: 'No'
  },
  no: 'No',
  yes: 'Yes',
  settings: [],
  type: 'radio',
  validation: null,
  value: null
};

export const Psa3_check = {
  attributes: [],
  default_option: 'yes',
  label: 'PSA3 check',
  multiple: false,
  name: 'psa1_check',
  options: {
    yes: 'Yes', no: 'No'
  },
  no: 'No',
  yes: 'Yes',
  settings: [],
  type: 'radio',
  validation: null,
  value: null
};

export const Sor_codes = {
  name: 'sor_codes',
  label: 'Claim SOR',
  value: null,
  type: 'group',
  validation: null,
  multiple: true,
  attributes: [],
  settings: [],
  inputs: {
    code: {
      name: 'code',
      label: 'SOR code',
      value: null,
      type: 'dropdown',
      validation: null,
      multiple: false,
      attributes: [],
      settings: [],
      options: {
        D13433: 'D13433'
      },
      default_option: 'D13433',
      placeholder: 'Select a SOR'
    },
    quantity: {
      name: 'quantity',
      label: 'Quantity',
      value: null,
      type: 'text',
      validation: 'numeric',
      multiple: false,
      attributes: [],
      settings: []
    }
  }
};
