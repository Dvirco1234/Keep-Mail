import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models'
import { KeepService } from 'src/app/services/keep-service.service';
import { UserService } from 'src/app/services/user-service.service'
import { UtilService } from 'src/app/services/util-service.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
    constructor(
        private utilService: UtilService,
        private keepService: KeepService,
        private userService: UserService,
    ) {}

    searchTerm: string = '';
    user!: User;
    isUserMenuOpen: boolean = false;

    search() {
        // console.log('searchTerm: ', this.searchTerm);
        // this.keepService.setSearchFilter(this.searchTerm)
        this.keepService.setFilterBy({ searchTerm: this.searchTerm })
    }

    clearSearch() {
        this.searchTerm = '';
        this.search();
    }

    toggleMenu() {
        this.keepService.toggleSideMenu()
    }
    
    toggleUserMenu() {
        this.isUserMenuOpen = true
    }

    ngOnInit(): void {
        this.search = this.utilService.debounce(this.search.bind(this), 700);
        this.user = this.userService.getLoggedInUser();
        console.log('this.user: ', this.user);
    }
}
