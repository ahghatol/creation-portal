import { Component, OnInit, NgModule, EventEmitter, Output, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ResourceService } from '../../services/resource/resource.service';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  public defaultContentList = [];
  public contentList = [];
  public viewAllButtonText ="View All";
  public defaultGridScreen = true;
  public isLoading = true;
  public sectionName = '';
  resourceIdentifiers = [];

  @Output() onProceedClick: EventEmitter<{event: MouseEvent, data: any}> = new EventEmitter();
  @Output() closeResourceModal: EventEmitter<{}> = new EventEmitter();

  constructor(public resourceService : ResourceService, cdRef : ChangeDetectorRef) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe((data: any) => {
      this.isLoading = false;
      this.defaultContentList = _.get(data, 'sections') || [];
      this.defaultContentList.forEach(item => _.map(item.contents, (content) => {
        content['cardImg'] = content['appIcon'] || '';
      }));
    });
  }

  showAllList(event, section) {
    this.sectionName = _.get(section, 'name') || '';
    this.isLoading = true;
    this.defaultGridScreen = false;
    const data = JSON.parse(_.get(section, 'searchQuery'));

    // Set limit to 50
    data.request['limit'] = 50;
    this.resourceService.searchResources(data).subscribe((data: any) => {
      this.isLoading = false;
      this.contentList = _.get(data, 'content');
      _.map(this.contentList, (content) => {
        content['cardImg'] = content['appIcon'] || '';
      });
    });
  }

  onCardCheckUncheck(event) {
    const checked  = _.get(event, 'event.target.checked');
    const resourceIdentifier = _.get(event, 'data.identifier');

    if (checked === true) {
      this.resourceIdentifiers.push(resourceIdentifier);
    } else {
      this.resourceIdentifiers = _.without(this.resourceIdentifiers, resourceIdentifier);
    }
  }

  proceedClick(event) {
    this.onProceedClick.emit({event: event, data: this.resourceIdentifiers});
    this.closeResourceModal.emit();
  }

  // closeModal() {
  //   this.closeResourceModal.emit();
  //   this.resourceIdentifiers = [];
  // }

  backClick () {
    this.resourceIdentifiers = [];
    this.defaultGridScreen = true;
  }
}
