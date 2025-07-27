import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../config/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  apiURL: string = environment.apiURLBase + '/api/chats';

  constructor(private http: HttpClient, private authService: AuthService) {}
}
