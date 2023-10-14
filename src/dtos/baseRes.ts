export class BaseObj {
  success: boolean = false;
  errorMessage?: string = '';
}

export class BaseRes<T> extends BaseObj {
  content!: T;
}
