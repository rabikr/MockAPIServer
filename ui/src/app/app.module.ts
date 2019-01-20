import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { IndexComponent } from './components/index/index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServerComponent } from './components/server/server.component';

@NgModule({
  declarations: [
    IndexComponent,
    SidebarComponent,
    TableComponent,
    FooterComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [IndexComponent]
})
export class AppModule { }
