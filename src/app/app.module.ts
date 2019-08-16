import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';

import { MatUtilsModule } from './matUtils/matUtils.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';
import { EventsComponent } from './events/events.component';
import { IndexComponent } from './index/index.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventComponent } from './event/event.component';

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    EventsComponent,
    IndexComponent,
    EditEventComponent,
    EventComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatUtilsModule,
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
