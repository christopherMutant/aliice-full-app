import { AppointmentStatus } from '../../all-entities';

export interface occurrenceInterface {
  start: Date;
  end: Date;
  duration: number;
  status: AppointmentStatus;
}
