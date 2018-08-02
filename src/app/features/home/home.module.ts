import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslationsService } from '../../core/services/translations/translations.service';

const modules = [
  SharedModule,
  HomeRoutingModule
];

const components = [
  HomeComponent
];

const providers = [];

@NgModule({
  imports: modules,
  declarations: components,
  providers
})
export class HomeModule {
  constructor(private translationsService: TranslationsService) {
    this.translationsService.registerModule('features/home');
  }
}
