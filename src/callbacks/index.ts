import { render } from './render';
import { init } from './init';
import { bindActions } from './bindActions';
import { settings } from './settings';
import { dpSettings } from './dpSettings';
import { advancedSettings } from './advancedSettings';
import { onSave } from './onSave';
import { leadsSelected } from './leadsSelected';
import { contactsSelected } from './contactsSelected';
import { todoSelected } from './todoSelected';
import { destroy } from './destroy';
import { onSource } from './onSource';
import { onSalesbotDesignerSave } from './onSalesbotDesignerSave';
import { onAddAsSource } from './onAddAsSource';

export const callbacks = {
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
