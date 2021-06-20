import { plugin } from 'cypress-firebase/lib';
import * as admin from 'firebase-admin';

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  return plugin(on, config, admin);
}
