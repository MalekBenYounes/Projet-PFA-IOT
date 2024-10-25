import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ParkingComponent } from './components/parking/parking.component';
import { HistoryComponent } from './components/history/history.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AppRoutingModule } from './components/app.routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { ConnectComponent } from './components/login/connect/connect.component';
import { RegisterComponent } from './components/login/register/register.component';
import { FogpasswordComponent } from './components/login/fogpassword/fogpassword.component';
import { LiuserComponent } from './components/liuser/liuser.component';
import { ParametreComponent } from './components/parametre/parametre.component';
import { StatComponent } from './components/stat/stat.component';
import { GroupeComponent } from './components/groupe/groupe.component';
import { AddgroupeComponent } from './components/addgroupe/addgroupe.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxEchartsModule } from 'ngx-echarts';
import { ClientComponent } from './components/client/client.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

registerLocaleData(fr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ParkingComponent,
    HistoryComponent,
    AdduserComponent,
    ClientComponent,
    ConnectComponent,
    RegisterComponent,
    FogpasswordComponent,
    LiuserComponent,
    ParametreComponent,
    GroupeComponent,
    StatComponent,
    AddgroupeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent],
})
export class AppModule {}
