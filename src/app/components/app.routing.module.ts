import { Component, NgModule } from '@angular/core';
import { AdduserComponent } from './adduser/adduser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { ParkingComponent } from './parking/parking.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { RegisterComponent } from './login/register/register.component';
import { ConnectComponent } from './login/connect/connect.component';
import { FogpasswordComponent } from './login/fogpassword/fogpassword.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { LiuserComponent } from './liuser/liuser.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ParametreComponent } from './parametre/parametre.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { StatComponent } from './stat/stat.component';
import { GroupeComponent } from './groupe/groupe.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from '../guards/auth.guard';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { AccesGuard } from '../guards/acces.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', component: ConnectComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'fogpassword', component: FogpasswordComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'parking', component: ParkingComponent, canActivate: [AccesGuard]},
      { path: 'history', component: HistoryComponent ,canActivate: [AccesGuard]},
      { path: 'adduser', component: AdduserComponent ,canActivate: [AccesGuard]},
      { path: 'liuser', component: LiuserComponent ,canActivate: [AccesGuard]},
      { path: 'parametre', component: ParametreComponent},
      
      { path: 'stat', component: StatComponent,canActivate: [AccesGuard] },
      { path: 'groupe', component: GroupeComponent,canActivate: [AccesGuard] },
      { path: 'client', component: ClientComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,

    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzButtonModule,
    NzTabsModule,
    NzAvatarModule,
    NzDropDownModule,
    NzFormModule,
    NzIconModule,
    FontAwesomeModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzModalModule,
    NzInputNumberModule,
    NzMessageModule,
    NzTableModule,
    NzSelectModule,
    NzCardModule,
    NzGridModule,
    NzDatePickerModule,
    NzListModule,
    NzCheckboxModule,
    NzSpaceModule,

  ],
  declarations: [],
})
export class AppRoutingModule {}
