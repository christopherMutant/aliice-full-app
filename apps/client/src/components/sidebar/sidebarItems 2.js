// icons
import {
  CalendarOutlined,
  EuroOutlined,
  FileOutlined,
  HomeOutlined,
  LineChartOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
// const sidebarItem = [
//   { header: 'Navigation' },
//   {
//     title: 'Dashboard',
//     icon: DashboardOutlined,
//     to: '/dashboard',
//   },
//   { header: 'Authentication' },
//   {
//     title: 'Login',
//     icon: LoginOutlined,
//     to: '/login1',
//   },
//   {
//     title: 'Register',
//     icon: ProfileOutlined,
//     to: '/register',
//   },
//   { header: 'Utilities' },
//   {
//     title: 'Typography',
//     icon: FontSizeOutlined,
//     to: '/typography',
//   },
//   {
//     title: 'Color',
//     icon: BgColorsOutlined,
//     to: '/colors',
//   },
//   {
//     title: 'Shadow',
//     icon: BarcodeOutlined,
//     to: '/shadow',
//   },
//   {
//     title: 'Ant Icons',
//     icon: CrownOutlined,
//     to: '/icon/ant',
//   },
//   { header: 'Support' },
//   {
//     title: 'Sample Page',
//     icon: ChromeOutlined,
//     to: '/sample-page',
//     children: [
//       {
//         title: 'Item1',
//         to: '/contacts',
//       },
//     ],
//   },
//   {
//     title: 'Documentation',
//     icon: QuestionOutlined,
//     to: 'https://codedthemes.gitbook.io/mantis-vuetify/',
//     type: 'external',
//     chip: 'gitbook',
//     chipColor: 'secondary',
//     chipVariant: 'flat',
//   },
// ]

const sidebarItem = [
  {
    title: 'Dashboard',
    icon: HomeOutlined,
    to: '/dashboard',
  },
  {
    title: 'Agenda',
    to: '/agenda',
    icon: CalendarOutlined,
  },
  {
    title: 'Contacts',
    icon: TeamOutlined,
    to: '/contacts',
    children: [
      {
        title: 'Contacts',
        to: '/contacts',
      },
      {
        title: 'Patients',
        to: '/contacts/patients',
      },
      {
        title: 'Doctors',
        to: '/contacts/doctors',
      },
    ],
  },
  {
    title: 'Invoices',
    icon: EuroOutlined,
    to: '/invoices',
    children: [
      {
        title: 'Daily Check',
        to: '/invoices',
      },
      {
        title: 'Open Services',
        to: '/invoices/patients',
      },
      {
        title: 'Reminders To Create',
        to: '/invoices/doctors',
      },
      {
        title: 'Assets',
        to: '/invoices/doctors',
      },
      {
        title: 'Statistics',
        to: '/invoices/doctors',
      },
      {
        title: 'Collections',
        to: '/invoices/doctors',
      },
    ],
  },
  {
    title: 'Measures',
    children: [
      {
        title: 'Laboratory Results',
        to: '/measures',
      },
      {
        title: 'QC Inbox',
        to: '/measures/patients',
      },
      {
        title: 'List of Devices',
        to: '/measures/doctors',
      },
      {
        title: 'All Requests',
        to: '/measures/doctors',
      },
    ],
  },
  {
    title: 'Documents',
    icon: FileOutlined,
    children: [
      {
        title: 'Inbox',
        to: '/documents',
      },
      {
        title: 'Direct Mail',
        to: '/documents/patients',
      },
    ],
  },
  {
    title: 'Tasks',
    children: [
      {
        title: 'Current Task',
        to: '/tasks',
      },
      {
        title: 'Summons',
        to: '/tasks/patients',
      },
      {
        title: 'All Tasks',
        to: '/tasks/patients',
      },
    ],
  },
  {
    title: 'Statistics',
    icon: LineChartOutlined,
    children: [
      {
        title: 'Advanced Search',
        to: '/statistics',
      },
      {
        title: 'Statistics',
        to: '/statistics/patients',
      },
    ],
  },
  {
    title: 'Settings',
    icon: SettingOutlined,
    children: [
      {
        title: 'User Settings',
        to: '/settings',
      },
      {
        title: 'Database',
        to: '/settings/patients',
      },
      {
        title: 'Patient Indicators',
        to: '/settings/patients',
      },
      {
        title: 'Laborator',
        to: '/settings/patients',
      },
      {
        title: 'Billing',
        to: '/settings/patients',
      },
      {
        title: 'Service Sheet',
        to: '/settings/patients',
      },
      {
        title: 'Favorites and Benefit Blocks',
        to: '/settings/patients',
      },
      {
        title: 'Consultation',
        to: '/settings/patients',
      },
      {
        title: 'Medical Notes',
        to: '/settings/patients',
      },
      {
        title: 'Catalogues',
        to: '/settings/patients',
      },
      {
        title: 'Medicine',
        to: '/settings/patients',
      },
      {
        title: 'Document Management',
        to: '/settings/patients',
      },
      {
        title: 'Inability',
        to: '/settings/patients',
      },
      {
        title: 'Tasks',
        to: '/settings/patients',
      },
      {
        title: 'Diagnosis and Anamesis',
        to: '/settings/patients',
      },
      {
        title: 'Mail',
        to: '/settings/patients',
      },
    ],
  },
]
export default sidebarItem
