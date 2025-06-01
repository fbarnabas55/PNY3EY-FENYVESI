import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavListComponent } from './core/nav-list/nav-list.component';
import { NgChartsModule } from 'ng2-charts';
import { StatisticsComponent } from './features/statistics/pages/statistics/statistics.component';


@NgModule({
  declarations: [
    AppComponent,
    NavListComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

