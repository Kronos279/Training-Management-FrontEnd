import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeminiChatService {

  constructor(private httpclient:HttpClient) { }

  getChatResposne(prompt:string){
    return this.httpclient.post<any>("http://localhost:8888/geminichat/prompt",prompt);
  }
}
