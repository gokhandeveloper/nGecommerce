import { Injectable } from '@angular/core';
import firebase from "firebase";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.userRepository.object('/users/' + user.uid).update( {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL

    })
  }

  get(uid: string) : Observable<any>{
    return this.userRepository.object('/users/'+ uid).valueChanges();
  }
}
