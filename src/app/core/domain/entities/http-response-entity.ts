export interface HttpResponseEntity<T> {
    message: string;
    data: T;
}

export interface HttpResponseMessageEntity {
  message: string;
}
