export const steps = ['Safari', 'Dates & Guests', 'Personal Info', 'Confirm'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export type FormErrors = Record<string, string>;

export type FormState = {
  safari: string[]; month: string; year: string;
  adults: number; children: number;
  startDate: string; endDate: string;
  firstName: string; lastName: string;
  email: string; phone: string;
  country: string; specialRequests: string; howHeard: string;
  consent: boolean;
};

export const EMPTY_FORM: FormState = {
  safari: [], month: '', year: '2026',
  adults: 2, children: 0,
  startDate: '', endDate: '',
  firstName: '', lastName: '',
  email: '', phone: '',
  country: '', specialRequests: '', howHeard: '',
  consent: false,
};
