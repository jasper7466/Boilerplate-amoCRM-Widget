import { EventBus } from './EventBus.js';
import { indexed } from '../types/common';

export class PostMessageTransport<Actions> {
  protected eventBus: EventBus;

  constructor(
    protected iFrameId: string,
    protected targetOrigin: string = '*',
    protected isStrictMode = false,
  ) {
    this.eventBus = new EventBus(isStrictMode);
    window.addEventListener('message', this.messageHandler.bind(this));
  }

  subscribe(action: string, callback: (payload: indexed<any>) => void): this {
    this.eventBus.subscribe(action, callback);
    return this;
  }

  unsubscribe(action: string, callback: (payload: any) => void): this {
    this.eventBus.unsubscribe(action, callback);
    return this;
  }

  postMessage<K extends keyof Actions>(
    action: K,
    payload: Actions[K],
  ): this | never {
    const iFrame = this.getFrame();
    iFrame.contentWindow?.postMessage({ action, payload }, this.targetOrigin);
    return this;
  }

  protected messageHandler(event: MessageEvent): void | never {
    if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) {
      return;
    }

    if (!('action' in event.data)) {
      if (this.isStrictMode) {
        this.raiseError('no "action" field in incoming message');
      }
      return;
    }

    const { action, payload } = event.data;

    this.eventBus.emit(action, payload);
  }

  protected raiseError(errorMessage: string): never {
    throw new Error(
      `${this.constructor.name}, id: "${this.iFrameId}": ${errorMessage}`,
    );
  }

  protected getFrame(): HTMLIFrameElement | never {
    const iFrame = document.querySelector(this.iFrameId) as HTMLIFrameElement;

    if (!iFrame) {
      this.raiseError('iframe element not found');
    }

    return iFrame;
  }
}
