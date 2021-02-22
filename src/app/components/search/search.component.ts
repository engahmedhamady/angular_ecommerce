import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router'; 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  doSearch(info:string)
    {
      console.log(info)

           this.route.navigateByUrl('/search/'+info);
          
    }
}
