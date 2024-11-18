import { useCookies } from 'react-cookie';
import { Primitive, Replaced } from '@/typings';
import { UserDataSchema } from '@/typings/database';
import type { ObjectId } from 'mongodb';
import React, { useContext } from 'react';

export type UserDataContext = Replaced<UserDataSchema, ObjectId, string, Primitive | Date>

export interface IUserContext {
  getData: () => UserDataContext | null;
  setData: (ctx: UserDataContext | null) => void
}

class Lazy<T> {
  private value?: T
  
  constructor(private getter: () => T) {
    this.value = undefined;
  }
  
  public get(): T {
    if (!this.value) {
      this.value = this.getter();
    }
    
    return this.value;
  }
}

export const UserContext: IUserContext = {
  getData: () => localStorage['userData'], setData: (v) => {
    localStorage['userData'] = v;
  },
}

export interface AuthCookie {
  getCookie(): string,
  
  setCookie(val: string): void,
  
  removeCookie(): void
}

export const authCookieName = 'appley-auth';
export const useAuthCookie: () => AuthCookie = () => {
  const [ cookieObj, setCookie, removeCookie ] = useCookies([ authCookieName ]);
  return {
    getCookie: () => cookieObj[authCookieName],
    setCookie: (newVal: string) => setCookie(authCookieName, newVal),
    removeCookie: () => removeCookie(authCookieName),
  }
};