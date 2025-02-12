// interface type user
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
// interface type task
export interface Task {
  id: number;
  name: string;
  status: string;
  user?: User;
}
