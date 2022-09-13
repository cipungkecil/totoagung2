'use babel';

import Totoagung2View from './totoagung2-view';
import { CompositeDisposable } from 'atom';

export default {

  totoagung2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.totoagung2View = new Totoagung2View(state.totoagung2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.totoagung2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'totoagung2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.totoagung2View.destroy();
  },

  serialize() {
    return {
      totoagung2ViewState: this.totoagung2View.serialize()
    };
  },

  toggle() {
    console.log('Totoagung2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
