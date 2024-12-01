export interface ContactDetails {
  email: string;
  phone: string;
}

export interface Person {
  id: string;
  surname: string;
  name: string;
  middle_name_rus: string;
  jobtitle: string;
  status: string;
  contacts: ContactDetails;
  working_hour: string;
  workplace: string;
  head: string;
  children: string[] | null;
  department: string;
  division: string;
  team: string[] | null;
  about: string;
}
