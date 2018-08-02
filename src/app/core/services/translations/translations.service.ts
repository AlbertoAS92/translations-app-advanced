import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TranslationsService {
  readonly prefix: string = 'app/';
  readonly suffix: string = '.json';
  readonly defaultLanguage: string = 'en_GB';
  readonly availableLanguages: string[] = ['en_GB', 'es_ES', 'pl_PL'];
  registeredModules: Set<string>;

  constructor(private http: HttpClient, private translateService: TranslateService) {
    translateService.addLangs(this.availableLanguages);
    translateService.setDefaultLang(this.defaultLanguage);
    translateService.use(this.defaultLanguage);
    this.registeredModules = new Set<string>();
  }

  registerModule(modulePath: string): void {
    this.getTranslations(modulePath, this.translateService.currentLang)
      .subscribe( translations => {
        this.translateService.setTranslation(this.translateService.currentLang, translations, true);
        this.registeredModules.add(modulePath);
      });
  }

  changeLanguage(language: string): void {
    Array.from(this.registeredModules).map(
      module => this.getTranslations(module, language)
        .subscribe(translations => {
          this.translateService.setTranslation(language, translations, true);
          this.translateService.use(language);
        })
    );
  }

  private getTranslations(modulePath: string, language: string): Observable<{[key: string]: string}> {
    const url = modulePath ? `${this.prefix}${modulePath}/i18n/${modulePath.split('/').pop()}-${language}${this.suffix}`
      : `${modulePath}i18n/${language}${this.suffix}`;

    if (JSON.parse(localStorage.getItem(url))) {
      return of(JSON.parse(localStorage.getItem(url)));
    } else {
      return this.http.get<{[key: string]: string}>(url)
          .pipe(
          tap(translations => localStorage.setItem(url, JSON.stringify(translations)))
        );
    }
  }
}
