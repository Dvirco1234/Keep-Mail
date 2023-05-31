import { Component, OnInit } from '@angular/core';
import { KeepService } from 'src/app/services/keep-service.service';
import { UtilService } from 'src/app/services/util-service.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
    constructor(
        private utilService: UtilService,
        private keepService: KeepService
    ) {}

    searchTerm: string = '';

    search() {
        // console.log('searchTerm: ', this.searchTerm);
        // this.keepService.setSearchFilter(this.searchTerm)
        this.keepService.setFilterBy({ searchTerm: this.searchTerm })
    }

    clearSearch() {
        this.searchTerm = '';
        this.search();
    }

    ngOnInit(): void {
        this.search = this.utilService.debounce(this.search.bind(this), 700);
    }
}
