import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuickStats } from './quick-stats.interface';
import { Character } from '../characters/interfaces/characters.interface';
import { LineChart } from './line-chart/line-chart.interface';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private host = environment.hostAPI;

    constructor(private http: HttpClient) { }

    getQuickStats() {
        return this.http.get<QuickStats>(`${this.host}dashboard/quickStats`);
    }

    getWhoList() {
        return this.http.get<Character[]>(`${this.host}dashboard/who`);
    }


    getAccountStats() {
        return this.http.get<LineChart[]>(`${this.host}dashboard/AccountStats`);
    }
}

