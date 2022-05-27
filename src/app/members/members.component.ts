import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: any[] = [];
  

  constructor(public appService: AppService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getMembers()
  }

  goToAddMemberForm() {
    this.router.navigate(['addmember']);
  }

  getMembers(){
    this.appService.getMembers().subscribe((members: any) => (this.members = members),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      }
    );
  }

  // getMembers(){
  //   this.appService.getMembers().subscribe(
  //     (res: any) => this.members = res,
  //     err => {
  //       if(err instanceof HttpErrorResponse) {
  //         if(err.status === 401){
  //           this.router.navigate(['/login']);
  //         }
  //       }

  //     }
  //   )
  // }

  onDelete(id:number){
    // if(confirm("Are you sure to delete this record ?") ==true){
      console.log(id);
      this.appService.deleteMember(id).subscribe({
        next:(res) =>{
          alert("Deleted Successfully");
          this.getMembers();
        },
        error : ()=>{
          alert("Error while deleting the product")
      }
    })
  }

  update(id:number){
      this.router.navigate(['/updatemember',id]);
  }
  

}
      
