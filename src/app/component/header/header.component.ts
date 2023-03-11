import { Component, OnInit, Renderer2 } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
  
export class HeaderComponent {

  public headerCategories: Array<ICategoryResponse> = [];
  public shortpath = environment.SHORT_PATH_PROD;

  constructor(
    private categoryService: CategoryService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.headerCategories = data;
    })
  }

  openMenu() {
    const burger = document.getElementById('burger');
    let btnOpen = document.getElementById('open');
    const btnClose = document.getElementById('close');

    // this.renderer.setStyle(burger, 'bottom', 'calc(0% - 70px)');
    
    let box = btnOpen?.getBoundingClientRect();   
    this.renderer.setStyle(burger, 'top', '20px');
    this.renderer.setStyle(burger, 'left', `${box?.left}px`);
    
    // this.renderer.setStyle(btnOpen, 'display', 'none');
    
    // this.renderer.setStyle(btnClose, 'display', 'block');
  }

  closeMenu() {
    const burger = document.getElementById('burger');
    const btnOpen = document.getElementById('open');
    const btnClose = document.getElementById('close');

    this.renderer.setStyle(burger, 'top', '-100lvh');
    // this.renderer.setStyle(btnOpen, 'display', 'block');
    // this.renderer.setStyle(btnClose, 'display', 'none');
  }

}
