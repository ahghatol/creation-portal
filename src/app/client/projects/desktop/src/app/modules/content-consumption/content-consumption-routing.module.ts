import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcePageComponent, TocPageComponent } from './components';
const routes: Routes = [
  {
    path: 'content/:contentId', component: ResourcePageComponent, data: {
      telemetry: {
        env: 'player-page', pageid: 'play-content', type: 'view', subtype: 'paginate'
      },
    },
  },
  {
    path: 'collection/:collectionId', component: TocPageComponent, data: {
      telemetry: {
        env: 'player-page', pageid: 'play-collection', type: 'view', subtype: 'paginate'
      },
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentConsumptionRoutingModule { }
