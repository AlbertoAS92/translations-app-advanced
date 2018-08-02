import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { TranslationsService } from '../../core/services/translations/translations.service';

const modules = [
  SharedModule,
  FeatureRoutingModule
];

const components = [
  FeatureComponent
];

const providers = [];

@NgModule({
  imports: modules,
  declarations: components,
  providers
})
export class FeatureModule {
  constructor(private translationsService: TranslationsService) {
    this.translationsService.registerModule('features/feature');
  }
}
