'use babel';

import BetflixDcView from './betflix-dc-view';
import { CompositeDisposable } from 'atom';

export default {

  betflixDcView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.betflixDcView = new BetflixDcView(state.betflixDcViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.betflixDcView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'betflix-dc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.betflixDcView.destroy();
  },

  serialize() {
    return {
      betflixDcViewState: this.betflixDcView.serialize()
    };
  },

  toggle() {
    console.log('BetflixDc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
