export interface IResponse<T> {
  total: number;
  limit: number;
  skip: number;
  data: T;
}


export class Response {
  private _data: any
  constructor(data?: any, private limit?: number, private skip?: number) {
    this._data = data
  }

  public FindAllResponse() {
    return {
      total: this._data.length,
      limit: this.limit,
      skip: this.skip,
      data: this._data ?? []
    };
  }
}
