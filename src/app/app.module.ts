import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatGalleryEffects } from './store/effects/cat-gallery.effects';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CatGalleryComponent } from './components/cat-gallery/cat-gallery.component';
import { CatGalleryFilterComponent } from './components/cat-gallery-filter/cat-gallery-filter.component';
import { CatImageInterceptor } from './interceptors/cat-image.interceptor';
import {
  CatGalleryState,
  imageReducers,
} from './store/reducers/cat-gallery-images.reducers';
import { CatGalleryItemComponent } from './components/cat-gallery-item/cat-gallery-item.component';
import { CatResolver } from './resolvers/cat.resolver';
import { ParentGalleryComponent } from './components/parent-gallery.component';

const catGalleryReducerMap: ActionReducerMap<CatGalleryState> = {
  imageData: imageReducers,
};

@NgModule({
  declarations: [
    AppComponent,
    ParentGalleryComponent,
    CatGalleryComponent,
    CatGalleryFilterComponent,
    CatGalleryItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forRoot(catGalleryReducerMap),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([CatGalleryEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CatImageInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
