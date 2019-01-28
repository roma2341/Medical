import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Medical';
  deferredPrompt:any;

  constructor() {
    window.addEventListener('beforeinstallprompt',  (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    
      this.suggestInstallation();
    
    });
  }

  suggestInstallation(){
    debugger;
    if(this.deferredPrompt !== undefined) {
      // The user has had a postive interaction with our app and Chrome
      // has tried to prompt previously, so let's show the prompt.
      this.deferredPrompt.prompt();

      // Follow what the user has done with the prompt.
      this.deferredPrompt.userChoice.then(function(choiceResult) {

        console.log(choiceResult.outcome);

        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }

        // We no longer need the prompt.  Clear it up.
        this.deferredPrompt = null;
      });
    }
  }
}
