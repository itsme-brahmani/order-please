export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpireDate: Date
  ){}

  get token() {
    if(!this._tokenExpireDate || new Date() > this._tokenExpireDate) {
      return null;
    }
    console.log('token data', this._token);

    return this._token;
  }
}
