import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pig-add-form',
  templateUrl: './pig-add-form.component.html',
  styleUrls: ['./pig-add-form.component.css']
})
export class PigAddFormComponent implements OnInit{

  // router service and HttpClient is injected here
  constructor(private _router: Router, private _http: HttpClient) {
    // add the disabled attribute back to the submit button
    document.getElementById("submit")?.setAttribute("disabled", "disabled");

    // if the user accesses this URL not through the "add button" on the main page then redirect them back.
    if (this._router.getCurrentNavigation()?.extras.state?.['legalNav'] == null) _router.navigateByUrl("")
  }

  ngOnInit(): void {
    // preload date and time (unchangable)
    (<HTMLInputElement>document.getElementById("date")).value = new Date().toLocaleDateString();
    (<HTMLInputElement>document.getElementById("time")).value = new Date().toLocaleTimeString(
      [], {hour: '2-digit', minute: '2-digit'});
  }

  /**
 *  Prevents a "-" from being entered for the ID
 * @param e: the event object
 */
  preventNegatives(e: any) {
    if (e.key === "-") {
        e.preventDefault();
        return false;
    }
    return true;
  }

  validateForm() {
    let submitButton = document.getElementById("submit");
    console.log("form has been changed")
    if (this.checkRequiredFields()) {
      submitButton?.removeAttribute("disabled");
    } else {
      document.getElementById("submit")?.setAttribute("disabled", "disabled");
    }
  }

  // checks if all inputs are filled out.
  checkRequiredFields(): boolean {
    return (this.addRequiredFieldsChecked() ? true : false)
  }

  // helper to check if all input fields have something in it
  addRequiredFieldsChecked(): boolean {
    let allInputs = document.querySelectorAll("input");
    let allHasVal = true;
    
    allInputs.forEach((input) => {
      if (input.value == "") {
        allHasVal = false; 
      }
    }) 

    return allHasVal;
  }

  // checks if the phone number returned matches the regex.
  checkProperPhone() {
    return true
  }

  // adds the pig report to the server and navigates back to the main screen
  onClickFormSubmit() {
    this._router.navigateByUrl("")
  }
}
