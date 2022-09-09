import { render } from './render.js';
import { init } from './init.js';
import { bindActions } from './bindActions.js';
import { settings } from './settings.js';
import { dpSettings } from './dpSettings.js';
import { advancedSettings } from './advancedSettings.js';
import { onSave } from './onSave.js';
import { leadsSelected } from './leadsSelected.js';
import { contactsSelected } from './contactsSelected.js';
import { todoSelected } from './todoSelected.js';
import { destroy } from './destroy.js';
import { onSource } from './onSource.js';
import { onSalesbotDesignerSave } from './onSalesbotDesignerSave.js';
import { onAddAsSource } from './onAddAsSource.js';

export const handlers = {
  render,
  init,
  bindActions,
  settings,
  dpSettings,
  advancedSettings,
  onSave,
  leadsSelected,
  contactsSelected,
  todoSelected,
  destroy,
  onSource,
  onSalesbotDesignerSave,
  onAddAsSource,
};
