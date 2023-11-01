import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatResolver } from './resolvers/cat.resolver';

import { ParentGalleryComponent } from './components/parent-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: ParentGalleryComponent,
    resolve: { breeds: CatResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
