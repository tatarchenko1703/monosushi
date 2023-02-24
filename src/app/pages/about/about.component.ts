declare var $: any;

import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
  

export class AboutComponent {
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    let details = document.querySelectorAll("details");
    for (let i = 0; i < details.length; i++) {
      details[i].addEventListener("toggle", accordion);
    }
    
    function accordion(event: any) {
      if (!event.target.open) return;
      var details = event.target.parentNode.children;
      for (let i = 0; i < details.length; i++) {
        if (details[i].tagName != "DETAILS" || !details[i].hasAttribute('open') || event.target == details[i]) continue;
        details[i].removeAttribute("open");
      }
    }
  }
}

