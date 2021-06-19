import { attachCustomCommands } from "cypress-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

import { environment } from '../../src/environments/environment';

firebase.initializeApp(environment.firebase);

attachCustomCommands({ Cypress, cy, firebase });
