import { EventBus } from './EventBus.js';
import { indexed } from '../types/common';

export class PostMessageTransport<Subjects> {
  protected eventBus: EventBus;

  constructor(
    protected iFrameId: string,
    protected targetOrigin: string = '*',
    protected isStrictMode = false,
  ) {
    this.eventBus = new EventBus(isStrictMode);
    window.addEventListener('message', this.messageHandler.bind(this));
  }

  subscribe(subject: string, callback: (payload: indexed<any>) => void): this {
    this.eventBus.subscribe(subject, callback);
    return this;
  }

  unsubscribe(subject: string, callback: (payload: any) => void): this {
    this.eventBus.unsubscribe(subject, callback);
    return this;
  }

  postMessage<K extends keyof Subjects>(
    subject: K,
    payload: Subjects[K],
  ): this | never {
    const iFrame = this.getFrame();
    iFrame.contentWindow?.postMessage({ subject, payload }, this.targetOrigin);
    return this;
  }

  protected messageHandler(event: MessageEvent): void | never {
    if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) {
      return;
    }

    if (!('subject' in event.data)) {
      if (this.isStrictMode) {
        this.raiseError('no "subject" field in incoming message');
      }
      return;
    }

    const { subject, payload } = event.data;

    this.eventBus.emit(subject, payload);
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
