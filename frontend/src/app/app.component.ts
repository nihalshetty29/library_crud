


// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { BookCrudComponent } from './components/book-crud/book-crud.component';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   standalone: true, // Mark as standalone
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   imports: [RouterModule,BookCrudComponent,HttpClientModule] // Import RouterModule for routing
// })
// export class AppComponent {
//   title = 'Library CRUD Application';
// }

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookCrudComponent } from './components/book-crud/book-crud.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, BookCrudComponent, HttpClientModule] // Import RouterModule for routing and HTTP
})
export class AppComponent {
  title = 'Library CRUD Application'; // Title of your application
}
