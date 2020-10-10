import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {

    //Sidebar collapse on and off
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.toastr.success("Logout Successful", 'Goodbye');
    this.router.navigate(['user/registration']);

  }

}
