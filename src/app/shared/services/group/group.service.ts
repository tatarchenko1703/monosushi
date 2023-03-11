import { Injectable } from '@angular/core';
import { IGroupRequest, IGroupResponse } from '../../interfaces/group/group.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private url = environment.BACKEND_URL;
  private api = { groups: `${this.url}/groups` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IGroupResponse[]> {
    return this.http.get<IGroupResponse[]>(this.api.groups);
  }

  create(group: IGroupRequest): Observable<IGroupResponse> {
    return this.http.post<IGroupResponse>(this.api.groups, group);
  }

  update(group: IGroupRequest, id: number): Observable<IGroupResponse> {
    return this.http.patch<IGroupResponse>(`${this.api.groups}/${id}`, group);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.groups}/${id}`);
  }
}
