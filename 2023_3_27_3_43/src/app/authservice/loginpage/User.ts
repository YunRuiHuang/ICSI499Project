export class User{

  user_id: number;
  user_name: string;
  real_name: string;
  email: string;
  location: string;
  profile_img_id: string | null;
  bio: string | null;
  password: string;
  has_items_list: number;
  other_info: string | null;
   _token:string;

  constructor(
    user_id: number,
    user_name: string,
    real_name: string,
    email: string,
    location: string,
    profile_img_id: string | null,
    bio: string | null,
    password: string,
    has_items_list: number,
    other_info: string | null,
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.real_name = real_name;
    this.email = email;
    this.location = location;
    this.profile_img_id = profile_img_id;
    this.bio = bio;
    this.password = password;
    this.has_items_list = has_items_list;
    this.other_info = other_info;
    this._token = "AuthUser";
  }

  getUserId() {
    return this.user_id;
  }
  setUserId(id:number) {
    this.user_id = id;
  }

  getUserName() {
    return this.user_name;
  }

  setUserName(name:string) {
    this.user_name = name;
  }

  getRealName() {
    return this.real_name;
  }

  setRealName(name:string) {
    this.real_name = name;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email:string) {
    this.email = email;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location:string) {
    this.location = location;
  }

  getProfileImgId() {
    return this.profile_img_id;
  }

  setProfileImgId(id:string) {
    this.profile_img_id = id;
  }

  getBio() {
    return this.bio;
  }

  setBio(bio:string) {
    this.bio = bio;
  }

  getPassword() {
    return this.password;
  }



  getHasItemsList() {
    return this.has_items_list;
  }

  setHasItemsList(value:number) {
    this.has_items_list = value;
  }

  getOther() {
    return this.other_info;
  }

  setOther(info:string) {
    this.other_info = info;
  }

get token(){
    // if (!this.tokenExpirationDate||new Date()>this.tokenExpirationDate) {
    //   return null;
    // }
    return this._token;
}

editToDatabase(){
const body={
  user_id: this.user_id,
  user_name: this.user_name,
  real_name: this.real_name,
  email: this.email,
  location: this.location,
  profile_img_id: this.profile_img_id,
  bio: this.bio,
  password: this.password,
  has_items_list: this.has_items_list,
  other_info: this.other_info
};
    return body;

}

}
