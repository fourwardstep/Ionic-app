import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chatmsgs } from '../services/chatmsgs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.page.html',
  styleUrls: ['./chatbox.page.scss'],
})
export class ChatboxPage implements OnInit {

  answer = "";
  Access_token = "174fda8983514f70b4244fee5575e649";
  messages: Chatmsgs[] = [];
  userId: string;
  botId: string = "bot_default";
  question: string;

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit() {
    this.userId = this.service.userData[0]['_id'];
  }

  goBack() {
    this.router.navigate(['jobs/conversation']);
  }


  ask(question) {
    let queryData = {
      query: question,
      sessionId: this.userId
    }
    let chat = new Chatmsgs(question, this.botId);
    this.messages.push(chat);
    this.question = '';
    this.service.dialogflow(queryData).subscribe((data: any) => {
      if (data.reply) {
        console.log(data.reply);
        let chat = new Chatmsgs(data.reply, this.userId);
        this.messages.push(chat);
      }
      else {
        console.log('sorry! bot is not responding');
      }
    });
  }

}
