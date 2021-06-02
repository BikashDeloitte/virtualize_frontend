import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject= new Subject<boolean>();

  constructor(
    private http:HttpClient
    ) { }



  //get user
  public getUser(loginUser:any){
    console.log(loginUser);
    return this.http.post(`${baseUrl}/user/login`,loginUser);
  }

  public generateToken(loginData:any){
    return "shashank-token";
  }

  //Login user: set token in local storage
  public loginUser(token){
    localStorage.setItem("token",token);
    //this.loginStatusSubject.next(true);
    return true;
  }

  //isLogin: user is Logged in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token")
    if(tokenStr == undefined || tokenStr=='' || tokenStr== null){
      return false;
    }else{
      return true;
    }
  }

  // Logout: remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //Set userDetail
  public setUser(user){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //Set Complete  userDetail
  public setUserCompleteDetail(userDetail){
    localStorage.setItem('userDetail',JSON.stringify(userDetail))

  }


  //getUser
  public gotUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  //get Complete user detail
  public getUserCompleteDetail(){
    let userDetailStr=localStorage.getItem("userDetail");
    if(userDetailStr!=null){
      return JSON.parse(userDetailStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user=this.gotUser();
    return user.type;
  }
}
