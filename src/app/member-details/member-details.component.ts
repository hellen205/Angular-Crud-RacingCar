import { Component, OnInit, OnChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {

  teams : any[]= [];
  id:any;
  result:any;
  
  memberList: any= {}
 
  
  
  constructor(private appService: AppService, private router: Router , private route:ActivatedRoute ) { }
  
  

  ngOnInit(): void {
    this.getTeams();
    this.route.params.subscribe((params)=>{
      this.id=params['id'];
    })
    console.log("id:"+this.id);
    if(this.id !== undefined){
      this.getMemberDetails(this.id);
    }
    
  } 

  

  ngOnChanges() { }

   // TODO: Add member to members

  onSubmit(form: NgForm){
    console.log(form);
    if(this.id !== undefined){
      this.appService.updateMember(form.value).subscribe((result) => {
        console.log(result);
        this.router.navigate(['/members'])
      })
    }
    else{
          this.appService.postMembers(form.value).subscribe((result) => {
          console.log(result)
          this.router.navigate(['/members']);
        })
      }
  }
  
  getTeams(){
     this.appService.getTeams().subscribe((teams: any) => (this.teams=teams));
   }

   

  getMemberDetails(id:number){
    this.appService.getMembersDetails(id).subscribe({
      next:(res:any) =>{
        console.log(res);
        this.memberList=res;
        // this.memberList.id = res['id'];
        // this.memberList.firstName = res['firstName'];
        // this.memberList.lastName = res['lastName'];
        // this.memberList.jobTitle = res['jobTitle'];
        // this.memberList.team = res['team'];
        // this.memberList.status = res['status'];
      }
   })
  }
}
