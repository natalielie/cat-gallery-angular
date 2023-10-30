import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatGalleryComponent } from './components/cat-gallery/cat-gallery.component';
import { CatResolver } from './resolvers/cat.resolver';

const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: CatGalleryComponent,
        resolve: {
          breeds: CatResolver,
        },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
