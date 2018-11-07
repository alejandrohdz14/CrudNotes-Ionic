import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  note = { id: null, title: null, description: null };
  id = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notesServices: NotesService) {
    this.id = navParams.get('id');
    if(this.id != 0){
      notesServices.getNote(this.id)
        .valueChanges().subscribe(note => {
          console.log(note)
          this.note = JSON.parse(JSON.stringify(note));
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  addNote(){
    if(this.id != 0){
      this.notesServices.updateNote(this.note);
      alert('Note has been updated');
    }
    else{
      this.note.id = Date.now();
      this.notesServices.createNote(this.note);
      alert('Note has been created');
    }
    this.navCtrl.pop();
  }

  deleteNote(){
    this.notesServices.deleteNote(this.note);
    alert('Note has been deleted');
    this.navCtrl.pop();
  }
}
