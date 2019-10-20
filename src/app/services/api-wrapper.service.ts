import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';

@Injectable({
	providedIn: 'root'
})
export class ApiWrapperService {

	constructor(private _http: HttpClient) { }

	getAll(serviceApi: string): Observable<any[]> {
		return this._http.get<any[]>(`${environment.apiUrl}/${serviceApi}`);
	}

	getById(serviceApi: string, id: Guid): Observable<any> {
		return this._http.get<any>(`${environment.apiUrl}/${serviceApi}/${id}`);
	}

	post(serviceApi: string, entity: any): Observable<any> {
		return this._http.post(`${environment.apiUrl}/${serviceApi}`, entity);
	}

	put(serviceApi: string, entity: any): Observable<any> {
		return this._http.put(`${environment.apiUrl}/${serviceApi}`, entity);
	}

	delete(serviceApi: string, id: Guid): Observable<any> {
		return this._http.delete(`${environment.apiUrl}/${serviceApi}/${id}`);
	}
}
